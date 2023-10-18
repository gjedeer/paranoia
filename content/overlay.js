/* ***** BEGIN LICENSE BLOCK *****
 * Version: MPL 1.1/GPL 2.0/LGPL 2.1
 *
 * The contents of this file are subject to the Mozilla Public License Version
 * 1.1 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 *
 * The Original Code is Gmail Conversation View
 *
 * The Initial Developer of the Original Code is
 * Mozilla messaging
 * Portions created by the Initial Developer are Copyright (C) 2010
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 *
 * Alternatively, the contents of this file may be used under the terms of
 * either the GNU General Public License Version 2 or later (the "GPL"), or
 * the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
 * in which case the provisions of the GPL or the LGPL are applicable instead
 * of those above. If you wish to allow use of your version of this file only
 * under the terms of either the GPL or the LGPL, and not to allow others to
 * use your version of this file under the terms of the MPL, indicate your
 * decision by deleting the provisions above and replace them with the notice
 * and other provisions required by the GPL or the LGPL. If you do not delete
 * the provisions above, a recipient may use your version of this file under
 * the terms of any one of the MPL, the GPL or the LGPL.
 *
 * ***** END LICENSE BLOCK ***** */

export async function getPopup(msg) {
	return await tbParanoia.calculateParanoiaLevel(msg, true);
};

export function callCalculateParanoiaLevel(msg) {
	tbParanoia.calculateParanoiaLevel(msg, false);
};

/**
 * tbParanoia namespace
 */

if (typeof(tbParanoia) === "undefined") {
	var tbParanoia = {

		/* Return only 'Received:' headers, parsed to objects */
		paranoiaGetReceivedHeaders: function(headers) {
			var received = Array();
			if ('received' in headers) {
				headers['received'].forEach(function(header) {
					var parsed= tbParanoia.paranoiaParseReceivedHeader(header);
					if (parsed != void 0) {
						received.push(parsed);
					}
				});
			}
			return received;
		},

		paranoiaParseReceivedHeader: function(header) {
			/* List is based on https://www.iana.org/assignments/mail-parameters/mail-parameters.xhtml#mail-parameters-7 */
			var secureMethods = ['SMTPS', 'ESMTPS',
					     'SMTPSA', 'ESMTPSA',
					     'AES256', 'AES128', 'SMTP-TLS', // Note: not in the list of the official Mail Transmission Types. 
					     'UTF8SMTPS', 'UTF8SMTPSA',
					     'LMTPS', 'LMTPSA',
					     'UTF8LMTPS', 'UTF8LMTPSA'];
			var additionalSecureMethods = ['with ESMTP/TLS', 'with ESMTP (TLS encrypted)', 'version=TLS', 'using TLSv', 'over TLS secured channel']
			var unknownMethods = ['IMAP', 'LMTP'];

			/* Regexp definition must stay in the loop - stupid JS won't match the same regexp twice */
			var rcvdRegexp = /^.*from\s+([^ ]+)\s+.*by\s+([^ ]+)\s+.*with\s+([-A-Za-z0-9]+).*;.*$/g;
			var rcvdIPRegexp = /^.*from\s+([^ ]+)\s+[^\[]+\[(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})\].*by\s+([^ ]+)\s+.*with\s+([-A-Za-z0-9]+).*;.*$/g;
			var rcvdMicrosoftRegexp = /^.*from\s+([^ ]+)\s+.*by\s+([^ ]+)\s+.*with\s+Microsoft\s+SMTP\s+Server\s*\(([-A-Za-z0-9=_]+).*;.*$/g;

			var matchedFrom = null;
			var matchedTo = null;
			var matchedMethod = null;
			var matchedFromIP = null;

			/* Microsoft now has its own regexp */
			var match = rcvdMicrosoftRegexp.exec(header);
			if(match) {
				matchedFrom = match[1];
				matchedTo = match[2];
				matchedMethod = match[3];
			}

			if(!matchedFrom) {
				/* Try one regexp first */
				var match = rcvdIPRegexp.exec(header);
				if(match) {
					matchedFrom = match[1];
					matchedFromIP = match[2];
					matchedTo = match[3];
					matchedMethod = match[4];
				}

				/* Try another, if the first one failed */
				if(!matchedFrom) {
					var match = rcvdRegexp.exec(header);
					if(match) {
						matchedFrom = match[1];
						matchedTo = match[2];
						matchedMethod = match[3];
					}
				}
			}

			if((matchedFrom === null && matchedFromIP == null) || matchedTo === null || matchedMethod === null) return void 0;

			var local = (matchedFrom && tbParanoia.paranoiaIsHostLocal(matchedFrom)) ||
			tbParanoia.paranoiaIsHostLocal(matchedTo) ||
			(matchedFromIP && tbParanoia.paranoiaIsHostLocal(matchedFromIP)) ||
			tbParanoia.paranoiaGetDomainName(matchedFrom) == tbParanoia.paranoiaGetDomainName(matchedTo) ||
			matchedMethod == 'local' ||
			matchedFrom.replace(/^\s+|\s+$/g, '') == matchedTo.replace(/^\s+|\s+$/g, ''); // trim

			var isSecure = (secureMethods.indexOf(matchedMethod.toUpperCase()) != -1);
			if(!isSecure) {
				for(var i = 0; i < additionalSecureMethods.length; i++) {
					if(header.indexOf(additionalSecureMethods[i]) != -1) {
						isSecure = true;
						break;
					}
				}
			}

			return {
				from: matchedFrom,
				fromIP: matchedFromIP,
				to: matchedTo,
				method: matchedMethod,
				local: local,
				secure: isSecure,
				unknown: (unknownMethods.indexOf(matchedMethod.toUpperCase()) != -1),
				toString: function() {
					var secureSign = this.secure ? '✓' : '✗';
					if(this.local) secureSign = '⌂';
					if(unknownMethods.indexOf(matchedMethod.toUpperCase()) != -1) secureSign = '?';
					return secureSign + ' ' + this.method + ": " + this.from + " ==> " + this.to;
				}
			};
        },

		/* Changes 'yandex' to 'Яндекс' */
		paranoiaGetProviderDisplayName: function(provider) {
			var providerDisplayNames = {
				'yandex' : 'Яндекс',
				'o2pl' : 'Grupa o2.pl',
				'onet' : 'Onet.pl',
				'wp': 'Wirtualna Polska',
				'gadu': 'Gadu Gadu',
				'qq': 'QQ',
				'home': 'Home.pl',
				'gmx': 'GMX',
			}

			if(providerDisplayNames[provider]) {
				return providerDisplayNames[provider];
			}
			else {
				return provider.charAt(0).toUpperCase() + provider.slice(1);
			}
		},

		/* Finds known email provider from an array of 'Received:' headers */
		paranoiaGetKnownProviders: function(receivedHeaders) {
			var known = {
				'yandex.net' : 'yandex',
				'yandex.ru' : 'yandex',
				'go2.pl' : 'o2pl',
				'tlen.pl' : 'o2pl',
				'o2.pl' : 'o2pl',
				'google.com' : 'google',
				'twitter.com' : 'twitter',
				'facebook.com' : 'facebook',
				'mailgun.us' : 'rackspace',
				'mailgun.org' : 'rackspace',
				'mailgun.net' : 'rackspace',
				'mailgun.info' : 'rackspace',
				'emailsrvr.com' : 'rackspace',
				'rackspace.com' : 'rackspace',
				'dreamhost.com' : 'dreamhost',
				'linode.com' : 'linode',
				'messagingengine.com' : 'fastmail',
				'fastmail.fm' : 'fastmail',
				'fastmail.net' : 'fastmail',
				'onet.pl' : 'onet',
				'sendgrid.com' : 'sendgrid',
				'sendgrid.net' : 'sendgrid',
				'wp.pl' : 'wp',
				'hostgator.com' : 'hostgator',
				'hostgator.net' : 'hostgator',
				'interia.pl' : 'interia',
				'yahoo.com' : 'yahoo',
				'hotmail.com' : 'hotmail',
				'outlook.com' : 'hotmail',
				'live.com' : 'hotmail',
				'qq.com' : 'qq',
				'gadu-gadu.pl' : 'gadu',
				'amazonses.com' : 'amazon',
				'amazon.com' : 'amazon',
				'home.pl' : 'home',
				'home.net.pl' : 'home',
				'gmx.com': 'gmx',
				'gmx.net': 'gmx',
			};

			var found = new Array();

			receivedHeaders.forEach(function(hdr) {
				var domainRegex = /(?:\.|^)([a-z0-9\-]+\.[a-z0-9\-]+)$/g;
				var thirdLevelDomain = /^(net|com|org|biz|info)\.[a-z0-9]+$/g;
				var thirdLevelDomainRegex = /(?:\.|^)([a-z0-9\-]+\.[a-z0-9\-]+\.[a-z0-9\-]+)$/g;

				var match = domainRegex.exec(hdr.from.toLowerCase());
				if(match)
				{
					var domain = match[1];
					
					// special case - .net.pl etc
					if(thirdLevelDomain.test(domain)) {
						match = thirdLevelDomainRegex.exec(hdr.from.toLowerCase());
						if(match) {
							domain = match[1];
						}
					}
					if(known[domain] && found.indexOf(known[domain]) == -1) {
						found.push(known[domain]);
					}
				}
			});

			return found;
		},

		/* Return number of insecure hosts in the path */
		paranoiaAreReceivedHeadersInsecure: function(receivedHeaders) {
			var insecure = 0;
			var unencryptedLocal = 0;
			var encrypted = 0;
			receivedHeaders.forEach(function(header) {
//				Application.console.log(header.from + " - " + header.secure);
				if(!header.secure && !header.local && !header.unknown) insecure++;
				if(!header.secure && header.local) unencryptedLocal++;
				if(!header.secure && header.unknown) unencryptedLocal++;
				if(header.secure) encrypted++;
			});

			return {
				'insecure': insecure,
				'unencryptedLocal': unencryptedLocal,
				'encrypted': encrypted
			};
		},

		/* Create a popup menu with all 'Received:' headers */
		paranoiaCreateReceivedPopup: function(receivedHeaders) {
			var popup = document.createElement('menupopup');
			popup.setAttribute('id', 'paranoiaConnectionList');

			receivedHeaders.forEach(function(hdr) {
				var item = document.createElement('menuitem');
				item.setAttribute('label', hdr.toString());
				popup.appendChild(item);
			});

			return popup;
		},

		/* Create an element with all 'Received:' headers */
		paranoiaCreateReceivedPopupAsText: function(receivedHeaders) {
			var popup = document.createElement('div');
			popup.setAttribute('id', 'paranoiaConnectionList');
			receivedHeaders.forEach(function(hdr) {
				var item = document.createElement('div');
				item.textContent = hdr.toString();
				popup.appendChild(item);
			});
			return popup;
		},

		/* Remove popup from DOM tree, if found */
		paranoiaRemoveReceivedPopup: function() {
			var elem = document.getElementById('paranoiaConnectionList');
			if(elem) elem.parentNode.removeChild(elem);
		},

		/* Return XULElement with icon - create one if necessary */
		paranoiaGetHdrIconDOM: function() {
			var id = 'paranoiaHdrIcon';
			if(document.getElementById(id))
			{
				return document.getElementById(id);
			}

			var parentBox = document.getElementById('dateValueBox'); ///////
			var previousBox = document.getElementById('smimeBox');

			if(!parentBox || !previousBox) {
				Application.console.log('Chrome element not found');
			}

			var elem = document.createElement('image');
			elem.setAttribute('id', id);
			elem.onclick = function() {
				document.getElementById('paranoiaConnectionList').openPopup(this, 'after_start', 0, 0, false, false);
			}                       
			parentBox.insertBefore(elem, previousBox);
			return elem;
		},

		/* Return icon - create one if necessary */
		/* Icon here is only being used as storage since it is not rendered in the backgound page */
		paranoiaGetIconDOM: function() {
			var id = 'paranoiaHdrIcon';
			if(document.getElementById(id))
			{
				return document.getElementById(id);
			}

			var elem = document.createElement('image');
			elem.setAttribute('id', id);
			document.body.appendChild(elem);
			return elem;
		},

		paranoiaSetPerfectIcon: function() {
			var icon = tbParanoia.paranoiaGetIconDOM();
			icon.setAttribute('src', './skin/perfect.png');
			icon.setAttribute('tooltiptext', 'Perfect - no known email providers and encryption between all hops');
			return icon;
		},

		paranoiaSetGoodIcon: function() {
			var icon = tbParanoia.paranoiaGetIconDOM();
			icon.setAttribute('src', './skin/good.png');
			icon.setAttribute('tooltiptext', 'Good - Email passed known providers or was unencrypted only on a local connection');
			return icon;
		},

		paranoiaSetBadIcon: function() {
			var icon = tbParanoia.paranoiaGetIconDOM();
			icon.setAttribute('src', './skin/bad.png');
			icon.setAttribute('tooltiptext', '1 non-local connection on the way was unencrypted');
			return icon;
		},

		paranoiaSetTragicIcon: function() {
			var icon = tbParanoia.paranoiaGetIconDOM();
			icon.setAttribute('src', './skin/tragic.png');
			icon.setAttribute('tooltiptext', 'More than 1 connection on the way was unencrypted');
			return icon;
		},

		paranoiaAddProviderIcon: function(providerName, parentBox) {
			var previousBox = tbParanoia.paranoiaGetIconDOM();

			var elem = document.createElement('image');
			elem.setAttribute('class', 'paranoiaProvider');
			elem.setAttribute('src', './skin/providers/' + providerName + '.png');
			elem.setAttribute('tooltiptext', tbParanoia.paranoiaGetProviderDisplayName(providerName));
			parentBox.appendChild(elem);
		},

		paranoiaAddProviderIcons: function(providers)
		{
			var oldIcons = document.getElementsByClassName('paranoiaProviderVbox');
			var i, len = oldIcons.length;
			var vbox;

			for(i = 0; i < len; i++) {
				var elem = oldIcons[i];
				elem.parentNode.removeChild(elem); 
			}
			
			for(var i = 0; i < providers.length; i++) {
				var item = providers[i];
				if(i % 2 == 0) {
					if(vbox) document.getElementById('dateValueBox').insertBefore(vbox, tbParanoia.paranoiaGetHdrIconDOM());
					var vbox = document.createElement('vbox');
					vbox.setAttribute('class', 'paranoiaProviderVbox');
				}
				tbParanoia.paranoiaAddProviderIcon(item, vbox);
			};
			if(vbox) document.getElementById('dateValueBox').insertBefore(vbox, tbParanoia.paranoiaGetHdrIconDOM());
		},

		/* Return true if host is on a local network */
		paranoiaIsHostLocal: function(hostname) {
			hostname = hostname.replace(/[\[\]]/,'');
			if(hostname == 'localhost') return true;
			if(hostname == '127.0.0.1') return true;
			if(hostname == 'ip6-localhost') return true;
			if(hostname == 'Internal') return true;
			if(hostname == 'www-data') return true;
			if(/^\.internal$/g.test(hostname)) return true; 
			if(/(^10\.)|(^172\.1[6-9]\.)|(^\172\.2[0-9]\.)|(^\172\.3[0-1]\.)|(^\192\.168\.)/g.test(hostname)) return true;
			return false;
		},

		/* mx123.mail.corpo.com -> corpo.com */
		paranoiaGetDomainName: function(hostname) {
			if(hostname.indexOf('.') < 0) {
				return hostname;
			}
            
			try {
				return hostname.match(/[a-z0-9][a-z0-9\-]+\.[a-z]+$/)[0];
			} catch(e) {
				return hostname;
			}
		},

		/* Checks if given nsMsgFolder is a RSS/Atom feed folder */
		paranoiaIsFeedFolder: function(folder) {
			return /^mailbox:\/\/[^@\/]+@Feeds/.exec(folder.URI);
		},

		init: function() {
			// http://stackoverflow.com/questions/5089405/thunderbird-extension-add-field-to-messagepane-how-to-deal-with-windows-instan
			/* Add a listener for changed message */
			gMessageListeners.push({
				onStartHeaders: function() {
					var msg = gMessageDisplay.displayedMessage;
					if(!msg) return;

					var folder = msg.folder;
					if(tbParanoia.paranoiaIsFeedFolder(folder)) return;

					MsgHdrToMimeMessage(msg, null, function (aMsgHdr, aMimeMsg) {
						var receivedHeaders = tbParanoia.paranoiaGetReceivedHeaders(aMimeMsg.headers);

						var providers = tbParanoia.paranoiaGetKnownProviders(receivedHeaders);

						try {
							var security = tbParanoia.paranoiaAreReceivedHeadersInsecure(receivedHeaders);
							if(!security.insecure && !security.unencryptedLocal && providers.length == 0) {
								tbParanoia.paranoiaSetPerfectIcon();
							}
							else if(!security.insecure) {
								var icon = tbParanoia.paranoiaSetGoodIcon();
								if(providers.length > 0 && security.unencryptedLocal > 0) {
									icon.setAttribute('tooltiptext', 'Good: Passed known email providers and the only unencrypted connections were local');
								}
								else {
									if(providers.length > 0) {
										icon.setAttribute('tooltiptext', 'Good: Passed known email providers');
									}
									if(security.unencryptedLocal > 0) {
										icon.setAttribute('tooltiptext', 'Good: The only unencrypted connections were local');
									}
								}
							}
							else if(security.insecure == 1) {
								tbParanoia.paranoiaSetBadIcon();
							}
							else {
								tbParanoia.paranoiaSetTragicIcon();
							}

							tbParanoia.paranoiaRemoveReceivedPopup();
							var popup = tbParanoia.paranoiaCreateReceivedPopup(receivedHeaders);
							document.getElementById('dateValueBox').appendChild(popup);
//							receivedHeaders.forEach(function(hdr) {Application.console.log(hdr);});

							tbParanoia.paranoiaAddProviderIcons(providers);
						}
						catch(e) {
							/* Message title bar modified - Compact Headers or other extension */
							if(e.name.toString() == "NotFoundError") {
								Application.console.log('XUL element not found: ' + e.message);
							} else {
								throw e;
							}
						}
					}, true, {
						partsOnDemand: true,
					});
				},
				onEndHeaders: function() {
				},  
				onEndAttachments: function () {
				},
				onBeforeShowHeaderPane: function () {
				}
			});
		}, // init()

		/* New function for main logic after porting to MailExtensions*/
		calculateParanoiaLevel: function(msg, returnPopup) {
			return messenger.messages.getFull(msg.id).then((messagePart) => {
				var icon = tbParanoia.paranoiaSetBadIcon(); // safe default

				var receivedHeaders = tbParanoia.paranoiaGetReceivedHeaders(messagePart.headers);
				var providers = tbParanoia.paranoiaGetKnownProviders(receivedHeaders);

				var security = tbParanoia.paranoiaAreReceivedHeadersInsecure(receivedHeaders);
				if(!security.insecure && !security.unencryptedLocal && providers.length == 0) {
					tbParanoia.paranoiaSetPerfectIcon();
				}
				else if(!security.insecure) {
					icon = tbParanoia.paranoiaSetGoodIcon();
					if(providers.length > 0 && security.unencryptedLocal > 0) {
						icon.setAttribute('tooltiptext', 'Good: Passed known email providers and the only unencrypted connections were local');
					}
					else {
						if(providers.length > 0) {
							icon.setAttribute('tooltiptext', 'Good: Passed known email providers');
						}
						if(security.unencryptedLocal > 0) {
							icon.setAttribute('tooltiptext', 'Good: The only unencrypted connections were local');
						}
					}
				}
				else if(security.insecure == 1) {
					tbParanoia.paranoiaSetBadIcon();
				}
				else {
					tbParanoia.paranoiaSetTragicIcon();
				}

				if (!returnPopup) {
					messenger.messageDisplayAction.setIcon({path: icon.getAttribute('src')});
					messenger.messageDisplayAction.setTitle({title: icon.getAttribute('tooltiptext')});
				} else {
					let popup = tbParanoia.paranoiaCreateReceivedPopupAsText(receivedHeaders);
					return new Promise((resolve) => {
						resolve(popup);
					});
				}
			});
		}  // calculateParanoiaLevel()
	} // tbParanoia
}; // if

//window.addEventListener("load", tbParanoia.init(), false);

