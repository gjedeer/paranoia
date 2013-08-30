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
 * Contributor(s):
 * GDR!
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

/* 
 * This is a UxU Test Runner test suite for Paranoia.
 * http://www.clear-code.com/software/uxu/index.html.en
 * https://addons.mozilla.org/en-US/thunderbird/addon/uxu-unittestxul/
 */

var description = 'Basic test cases';
var requiredAddons = ['tls-paranoia@gdr.name'];

utils.import("dump.js");
                                                    
function setUp() {
	// This function is always processed before each test.
	// (ex. creating instances of the class now tested, etc.)
	utils.setUpTestWindow();
}

function tearDown() {
	// This function is always processed after each test.
	// (ex. destroying instances, etc.)
	utils.tearDownTestWindow();
}

function startUp()
{
	// This function is processed only once before tests.
	// (ex. loading the class you want to test now, etc.)
}

function shutDown()
{
	// This function is processed only once after all tests finish.
}

function testInstalled() {
	var win = utils.getTestWindow();
	assert.isDefined(win.tbParanoia);
}

function testMarcus() {
	var headersStr = "X-Account-Key: account3\r\nX-UIDL: 51e3-0214-45454545-917a-ffaaffaaffaaffaa\r\nX-Mozilla-Status: 0001\r\nX-Mozilla-Status2: 00000000\r\nX-Mozilla-Keys:                                                                                 \r\nStatus:  U\r\nReturn-Path: <mxsfghesdedfvs@comcast.net>\r\nReceived: from mx-collie.atl.sa.earthlink.net ([207.69.195.165])\r\n\tby mdl-compact.atl.sa.earthlink.net (EarthLink SMTP Server) with SMTP id 1ht56yhg5ggr5ygt; Tue, 27 Aug 2013 08:29:15 -0400 (EDT)\r\nReceived: from qmta12.emeryville.ca.mail.comcast.net ([76.96.27.227])\r\n\tby mx-collie.atl.sa.earthlink.net (EarthLink SMTP Server) with ESMTP id 1veioz4FB3Nl36t0\r\n\tfor <mxsfghesdedfvs@earthlink.net>; Tue, 27 Aug 2013 08:29:15 -0400 (EDT)\r\nReceived: from omta01.emeryville.ca.mail.comcast.net ([76.96.30.11])\r\n\tby qmta12.emeryville.ca.mail.comcast.net with comcast\r\n\tid HoSe1m0050EPcho01oVEGn; Tue, 27 Aug 2013 12:29:14 +0000\r\nReceived: from sz0029.ev.mail.comcast.net ([76.96.40.138])\r\n\tby omta01.emeryville.ca.mail.comcast.net with comcast\r\n\tid HoVE1m00V2yr1eL8MoVEni; Tue, 27 Aug 2013 12:29:14 +0000\r\nDate: Tue, 27 Aug 2013 12:29:14 +0000 (UTC)\r\nFrom: mxsfghesdedfvs@comcast.net\r\nTo: mxsfghesdedfvs@earthlink.net\r\nMessage-ID: <806816440.741868.1377606554583.JavaMail.root@sz0029a.emeryville.ca.mail.comcast.net>\r\nSubject: tesing\r\nMIME-Version: 1.0\r\nContent-Type: multipart\/alternative; \r\n\tboundary=\"----=_Part_741867_312285907.1377606554582\"\r\nX-Originating-IP: [::ffff:67.212.111.222]\r\nX-Mailer: Zimbra 6.0.13_GA_2944 (ZimbraWebClient - FF3.0 (Mac)\/6.0.13_GA_2944)\r\nDKIM-Signature: v=1; a=rsa-sha256; c=relaxed\/relaxed; d=comcast.net;\r\n\ts=q20121106; t=1377606554;\r\n\tbh=1nYxj8PqaeAZ\/N5211SnuV7WFobEezVqC0WDJ\/ndEDU=;\r\n\th=Received:Received:Date:From:To:Message-ID:Subject:MIME-Version:\r\n\t Content-Type;\r\n\tb=T4cgFre10+yvP0rlbvcrPEelN+b46AMjY2c8Izg3TW0wALzanRWYeEn9YtsZcG63V\r\n\t umLVLEdiPpIf+NHzfe6jZ\/pCoimUyi0+hqWe5lCAzPoI0oPyRA29oy8vEDL9I00Lhq\r\n\t LK9R6hUYbSBap\/ApkZQafsAwI5mYr3W639L+wa8J8asQsZqY\/Ih11DxIVzvUVkuhD2\r\n\t 0nP32IdujpuWWnhMzRAutIgOdHx1EIL8jDEnUsYOw79UXEjTUZBo7NGOZeUBL8Quqr\r\n\t J3kMcxYR0cQHMXcVwgqGKTDiQVHPShjgBmRGCRjkxNHV587ADu7lEE7vwzs3RViD0\/\r\n\t m+Zvk+yyYq+Dg==\r\nX-ELNK-Received-Info: spv=0;\r\nX-ELNK-AV: 0\r\nX-ELNK-Info: sbv=0; sbrc=.0; sbf=00; sbw=000;\r\n";

	var tbParanoia = utils.getTestWindow().tbParanoia;
	
	var headers = tbParanoia.paranoiaParseHeaderString(headersStr);
	assert.equals(24, headers.length);
	var receivedHeaders = tbParanoia.paranoiaGetReceivedHeaders(headers);
	assert.equals(4, receivedHeaders.length);
	var security = tbParanoia.paranoiaAreReceivedHeadersInsecure(receivedHeaders);
	assert.equals(3, security.unencryptedLocal);
	assert.equals(1, security.insecure);
	assert.equals(0, security.encrypted);
}

function testSekurak() {
	var headersStr = "Return-Path: <www-data@ks3306108.kimsufi.com>\r\nX-Spam-Checker-Version: SpamAssassin 3.3.1 (2010-03-16) on shared111\r\nX-Spam-Level: \r\nX-Spam-Status: No, score=-1.9 required=4.0 tests=BAYES_00,T_RP_MATCHES_RCVD\r\n\tautolearn=ham version=3.3.1\r\nX-Original-To: gdr@gdr.name\r\nDelivered-To: gdr@shared111\r\nReceived: from ks3306108.kimsufi.com (ks3306108.kimsufi.com [178.32.219.59])\r\n\tby shared111.mvps.eu (Postfix) with ESMTPS id 189143C601C4\r\n\tfor <gdr@gdr.name>; Tue, 27 Aug 2013 14:07:52 +0000 (UTC)\r\nReceived: from www-data by ks3306108.kimsufi.com with local (Exim 4.72)\r\n\t(envelope-from <www-data@ks3306108.kimsufi.com>)\r\n\tid 1VEJu3-0001oN-Ot\r\n\tfor gdr@gdr.name; Tue, 27 Aug 2013 16:05:51 +0200\r\nTo: gdr@gdr.name\r\nSubject: =?UTF-8?Q?[sekurak]_Pojawi=C5=82_si=C4=99_nowy_komentarz_do_wpisu_Jak_zbu?=  =?UTF-8?Q?dowa=C4=87_prywatny_Internet=3F_-_w_Grecji_ju=C5=BC_dzia=C5=82a?=\r\nX-PHP-Originating-Script: 33:class-phpmailer.php\r\nDate: Tue, 27 Aug 2013 14:05:51 +0000\r\nFrom: Sekurak <sekurak@sekurak.pl>\r\nMessage-ID: <2384aa7d77f0d4e4afdca1e2b67cfe93@sekurak.pl>\r\nX-Priority: 3\r\nX-Mailer: PHPMailer 5.2.4 (http:\/\/code.google.com\/a\/apache-extras.org\/p\/phpmailer\/)\r\nMIME-Version: 1.0\r\nMIME-Version: 1.0\r\nContent-Transfer-Encoding: 8bit\r\nContent-Type: text\/plain; charset=UTF-8";

	var tbParanoia = utils.getTestWindow().tbParanoia;
	
	var headers = tbParanoia.paranoiaParseHeaderString(headersStr);
	assert.equals(19, headers.length);
	var receivedHeaders = tbParanoia.paranoiaGetReceivedHeaders(headers);
	assert.equals(2, receivedHeaders.length);
	var security = tbParanoia.paranoiaAreReceivedHeadersInsecure(receivedHeaders);
	assert.equals(1, security.unencryptedLocal);
	assert.equals(0, security.insecure);
	assert.equals(1, security.encrypted);
}

function testLocalhost() {
	var tbParanoia = utils.getTestWindow().tbParanoia;

	assertTrue(tbParanoia.paranoiaIsHostLocal('www-data'));
}
