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

window.addEventListener("load", function _overlay_eventListener () {

  /* Parse RFC-2822 header */
  function paranoiaParseHeaderString(headersStr) {
	  var hdrLines = headersStr.split("\r\n");
	  var headers = Array();
	  var currentHeader = "";

	  hdrLines.forEach(function(line, number, all) {
		  if(line[0] == " " || line[0] == "\t") {
			  currentHeader += " " + line.replace(/^\s+|\s+$/g, '');
		  }
		  else
	  {
		  if(currentHeader.length > 0) headers.push(currentHeader);
		  currentHeader = line;
	  }
	  });

	  return headers;
  }

  /* Return only 'Received:' headers, parsed to objects */
  function paranoiaGetReceivedHeaders(parsedHeaders) {
	  var received = Array();
	  var rcvdRegexp = /^Received:.*from\s+([^ ]+)\s+.*by ([^ ]+)\s+.*with\s+([A-Z0-9]+).*;.*$/g;
	  var secureMethods = ['SMTPS', 'ESMTPS', 'SMTPSA', 'ESMTPSA'];

	  parsedHeaders.forEach(function(header) {
          var match = rcvdRegexp.exec(header);
          if(match)
          {
			  received.push({
				  from: match[1],
				  to: match[2],
				  method: match[3],
				  secure: (secureMethods.indexOf(match[3]) != -1),
				  toString: function() {
					  return (this.secure ? '✓' : '✗') + ' ' + this.method + ": " + this.from + " ==> " + this.to;
				  }
			  });
          }
	  });

	  return received;
  }

  /* Return number of insecure hosts in the path */
  function paranoiaAreReceivedHeadersInsecure(receivedHeaders) {
	  var rv = 0;
	  receivedHeaders.forEach(function(header) {
		  Application.console.log(header.from + " - " + header.secure);
          if(!header.secure) rv++;
	  });

	  return rv;
  }

  /* Create a popup menu with all 'Received:' headers */
  function paranoiaCreateReceivedPopup(receivedHeaders) {
	  var popup = document.createElement('menupopup');
	  popup.setAttribute('id', 'paranoiaConnectionList');

	  receivedHeaders.forEach(function(hdr) {
          var item = document.createElement('menuitem');
		  item.setAttribute('label', hdr.toString());
		  popup.appendChild(item);
	  });

	  return popup;
  }

  /* Remove popup from DOM tree, if found */
  function paranoiaRemoveReceivedPopup() {
	  var elem = document.getElementById('paranoiaConnectionList');
	  if(elem) elem.parentNode.removeChild(elem);
  }

  /* Return XULElement with icon - create one if necessary */
  function paranoiaGetHdrIconDOM() {
	  var id = 'paranoiaHdrIcon';
	  if(document.getElementById(id))
	  {
		  return document.getElementById(id);
	  }

	  var parentBox = document.getElementById('dateValueBox'); ///////
	  var previousBox = document.getElementById('smimeBox');

	  var elem = document.createElement('image');
	  elem.setAttribute('id', id);
	  elem.setAttribute('style', 'list-style-image: url("chrome://demo/skin/icon.png"); width: 32px; height: 32px;');
      elem.onclick = function() {
          document.getElementById('paranoiaConnectionList').openPopup(this, 'after_start', 0, 0, false, false);
      }                       
	  parentBox.insertBefore(elem, previousBox);
	  return elem;
  }

  function paranoiaSetPerfectIcon() {
	  return paranoiaGetHdrIconDOM().setAttribute('style', 'list-style-image: url("chrome://demo/skin/perfect.png")');
  }

  function paranoiaSetBadIcon() {
	  return paranoiaGetHdrIconDOM().setAttribute('style', 'list-style-image: url("chrome://demo/skin/bad.png")');
  }

  function paranoiaSetTragicIcon() {
	  return paranoiaGetHdrIconDOM().setAttribute('style', 'list-style-image: url("chrome://demo/skin/tragic.png")');
  }


// http://stackoverflow.com/questions/5089405/thunderbird-extension-add-field-to-messagepane-how-to-deal-with-windows-instan
/* Add a listener for changed message */
gMessageListeners.push({
	onStartHeaders: function() {
		var msg = gMessageDisplay.displayedMessage;
		if(!msg) return;

		var folder = msg.folder;

		var offset = new Object();
		var messageSize = new Object();

		// https://github.com/clear-code/changequote/blob/0f5a09d3887d97446553d6225cc9f71dc2a75039/content/changequote/changequote.jsh
		// http://thunderbirddocs.blogspot.com/2005/02/thunderbird-extensions-how-to-get-body.html
		try {
			stream = folder.getOfflineFileStream(msg.messageKey, offset, messageSize);
			var scriptableStream=Components.classes["@mozilla.org/scriptableinputstream;1"].getService(Components.interfaces.nsIScriptableInputStream);

			scriptableStream.init(stream);
			var fullBody = scriptableStream.read(msg.messageSize);
			var headersStr = fullBody.substring(0, fullBody.indexOf("\r\n\r\n"));
			scriptableStream.close();
			stream.close();

			headers = paranoiaParseHeaderString(headersStr);
			receivedHeaders = paranoiaGetReceivedHeaders(headers);

			var insecure = paranoiaAreReceivedHeadersInsecure(receivedHeaders);
			if(!insecure)
			{
				paranoiaSetPerfectIcon();
			}
			else if(insecure == 1 && receivedHeaders.length > 1)
			{
				paranoiaSetBadIcon();
			}
			else
			{
				paranoiaSetTragicIcon();
			}
			
			paranoiaRemoveReceivedPopup();
            var popup = paranoiaCreateReceivedPopup(receivedHeaders);
			document.getElementById('dateValueBox').appendChild(popup);
//			receivedHeaders.forEach(function(hdr) {Application.console.log(hdr);});
		}
		catch(e) {
			Application.console.log("PROBLEM: " + e.message);
		}
	},
	onEndHeaders: function() {
	},  
	onEndAttachments: function () {
	},
	onBeforeShowHeaderPane: function () {
	}
});
}, false);
