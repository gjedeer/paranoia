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
 * The Original Code is Thunderbird Conversations
 *
 * The Initial Developer of the Original Code is
 *  Jonathan Protzenko <jonathan.protzenko@gmail.com>
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

"use strict";

var EXPORTED_SYMBOLS = ['MonkeyPatch']

const Ci = Components.interfaces;
const Cc = Components.classes;
const Cu = Components.utils;
const Cr = Components.results;

Cu.import("resource://emailchat/stdlib/misc.js");
Cu.import("resource://emailchat/stdlib/msgHdrUtils.js");
Cu.import("resource://emailchat/log.js");

const kStubUrl = "chrome://emailchat/content/index.html";

let Log = setupLogging("EmailChat.MonkeyPatch");

function MonkeyPatch(aWindow) {
  this._window = aWindow;
}

MonkeyPatch.prototype = {

  init: function () {
    // Nuke the reference to any old message window. Happens if we close the
    //  main window and open a new one without restarting Thunderbird.
    getMail3Pane(true);
    // We also have to call this at load-time. This is per the
    //  thunderbird-stdlib specification, see the documentation.
    fillIdentities();
  },

  install: function (obj) {
    obj.load = function () {
      let mainWindow = getMail3Pane();
      let tabmail = mainWindow.document.getElementById("tabmail");
      // We might not always have a selected message, so check first
      let msgHdr = mainWindow.gFolderDisplay.selectedMessage;
      if (!msgHdr)
        return;

      // chrometab is a builtin tab type, but we could also redefine our tab
      //  type if we wanted to.
      tabmail.openTab("chromeTab", {
        chromePage: kStubUrl + "?uri=" + msgHdrGetUri(msgHdr),
      });
    };
  },

}
