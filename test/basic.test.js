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
	var headersStr = "Return-Path: <www-data@ks3306108.kimsufi.com>\r\nX-Spam-Checker-Version: SpamAssassin 3.3.1 (2010-03-16) on shared111\r\nX-Spam-Level: \r\nX-Spam-Status: No, score=-1.9 required=4.0 tests=BAYES_00,T_RP_MATCHES_RCVD\r\n\tautolearn=ham version=3.3.1\r\nX-Original-To: whatever@gdr.name\r\nDelivered-To: gdr@shared111\r\nReceived: from ks3306108.kimsufi.com (ks3306108.kimsufi.com [178.32.219.59])\r\n\tby shared111.mvps.eu (Postfix) with ESMTPS id 189143C601C4\r\n\tfor <whatever@gdr.name>; Tue, 27 Aug 2013 14:07:52 +0000 (UTC)\r\nReceived: from www-data by ks3306108.kimsufi.com with local (Exim 4.72)\r\n\t(envelope-from <www-data@ks3306108.kimsufi.com>)\r\n\tid 1VEJu3-0001oN-Ot\r\n\tfor whatever@gdr.name; Tue, 27 Aug 2013 16:05:51 +0200\r\nTo: whatever@gdr.name\r\nSubject: =?UTF-8?Q?[sekurak]_Pojawi=C5=82_si=C4=99_nowy_komentarz_do_wpisu_Jak_zbu?=  =?UTF-8?Q?dowa=C4=87_prywatny_Internet=3F_-_w_Grecji_ju=C5=BC_dzia=C5=82a?=\r\nX-PHP-Originating-Script: 33:class-phpmailer.php\r\nDate: Tue, 27 Aug 2013 14:05:51 +0000\r\nFrom: Sekurak <sekurak@sekurak.pl>\r\nMessage-ID: <2384aa7d77f0d4e4afdca1e2b67cfe93@sekurak.pl>\r\nX-Priority: 3\r\nX-Mailer: PHPMailer 5.2.4 (http:\/\/code.google.com\/a\/apache-extras.org\/p\/phpmailer\/)\r\nMIME-Version: 1.0\r\nMIME-Version: 1.0\r\nContent-Transfer-Encoding: 8bit\r\nContent-Type: text\/plain; charset=UTF-8";

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

function testNonRFCNewline() {
	var headersStr = "X-Account-Key: account3\nX-UIDL: 51e3-0214-45454545-917a-ffaaffaaffaaffaa\nX-Mozilla-Status: 0001\nX-Mozilla-Status2: 00000000\nX-Mozilla-Keys:                                                                                 \nStatus:  U\nReturn-Path: <mxsfghesdedfvs@comcast.net>\nReceived: from mx-collie.atl.sa.earthlink.net ([207.69.195.165])\n\tby mdl-compact.atl.sa.earthlink.net (EarthLink SMTP Server) with SMTP id 1ht56yhg5ggr5ygt; Tue, 27 Aug 2013 08:29:15 -0400 (EDT)\nReceived: from qmta12.emeryville.ca.mail.comcast.net ([76.96.27.227])\n\tby mx-collie.atl.sa.earthlink.net (EarthLink SMTP Server) with ESMTP id 1veioz4FB3Nl36t0\n\tfor <mxsfghesdedfvs@earthlink.net>; Tue, 27 Aug 2013 08:29:15 -0400 (EDT)\nReceived: from omta01.emeryville.ca.mail.comcast.net ([76.96.30.11])\n\tby qmta12.emeryville.ca.mail.comcast.net with comcast\n\tid HoSe1m0050EPcho01oVEGn; Tue, 27 Aug 2013 12:29:14 +0000\nReceived: from sz0029.ev.mail.comcast.net ([76.96.40.138])\n\tby omta01.emeryville.ca.mail.comcast.net with comcast\n\tid HoVE1m00V2yr1eL8MoVEni; Tue, 27 Aug 2013 12:29:14 +0000\nDate: Tue, 27 Aug 2013 12:29:14 +0000 (UTC)\nFrom: mxsfghesdedfvs@comcast.net\nTo: mxsfghesdedfvs@earthlink.net\nMessage-ID: <806816440.741868.1377606554583.JavaMail.root@sz0029a.emeryville.ca.mail.comcast.net>\nSubject: tesing\nMIME-Version: 1.0\nContent-Type: multipart\/alternative; \n\tboundary=\"----=_Part_741867_312285907.1377606554582\"\nX-Originating-IP: [::ffff:67.212.111.222]\nX-Mailer: Zimbra 6.0.13_GA_2944 (ZimbraWebClient - FF3.0 (Mac)\/6.0.13_GA_2944)\nDKIM-Signature: v=1; a=rsa-sha256; c=relaxed\/relaxed; d=comcast.net;\n\ts=q20121106; t=1377606554;\n\tbh=1nYxj8PqaeAZ\/N5211SnuV7WFobEezVqC0WDJ\/ndEDU=;\n\th=Received:Received:Date:From:To:Message-ID:Subject:MIME-Version:\n\t Content-Type;\n\tb=T4cgFre10+yvP0rlbvcrPEelN+b46AMjY2c8Izg3TW0wALzanRWYeEn9YtsZcG63V\n\t umLVLEdiPpIf+NHzfe6jZ\/pCoimUyi0+hqWe5lCAzPoI0oPyRA29oy8vEDL9I00Lhq\n\t LK9R6hUYbSBap\/ApkZQafsAwI5mYr3W639L+wa8J8asQsZqY\/Ih11DxIVzvUVkuhD2\n\t 0nP32IdujpuWWnhMzRAutIgOdHx1EIL8jDEnUsYOw79UXEjTUZBo7NGOZeUBL8Quqr\n\t J3kMcxYR0cQHMXcVwgqGKTDiQVHPShjgBmRGCRjkxNHV587ADu7lEE7vwzs3RViD0\/\n\t m+Zvk+yyYq+Dg==\nX-ELNK-Received-Info: spv=0;\nX-ELNK-AV: 0\nX-ELNK-Info: sbv=0; sbrc=.0; sbf=00; sbw=000;\n";

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

function testIPExtraction() {
	var headersStr = "Return-Path: <theuser@theserver.net>\r\nReceived: from compute4.internal (compute4.nyi.mail.srv.osa [10.202.2.44])\r\n     by sloti15t15 (Cyrus git2.5+0-git-fastmail-9401) with LMTPA;\r\n     Sat, 07 Sep 2013 12:07:15 -0400\r\nX-Sieve: CMU Sieve 2.4\r\nX-Spam-score: 0.0\r\nX-Spam-hits: BAYES_60 1.5, EMPTY_MESSAGE 2.32, RCVD_IN_DNSWL_HI -5,\r\n  RP_MATCHES_RCVD -2.426, LANGUAGES unknown, BAYES_USED global,\r\n  SA_VERSION 3.3.2\r\nX-Spam-source: IP='204.121.3.52', Host='proofpoint4.theserver.net', Country='US',\r\n  FromHeader='gov', MailFrom='gov', XOriginatingCountry='US'\r\nX-Spam-charsets: plain='iso-8859-1'\r\nX-Resolved-to: otheruser@fastmail.fm\r\nX-Delivered-to: otheruser@fastmail.fm\r\nX-Mail-from: theuser@theserver.net\r\nReceived: from mx2 ([10.202.2.201])\r\n  by compute4.internal (LMTPProxy); Sat, 07 Sep 2013 12:07:15 -0400\r\nReceived: from proofpoint4.theserver.net (proofpoint4.theserver.net [204.121.3.52])\r\n    (using TLSv1 with cipher DHE-RSA-AES256-SHA (256/256 bits))\r\n    (No client certificate requested)\r\n    by mx2.theotherserver.com (Postfix) with ESMTPS id E3BA06C03CC\r\n    for <otheruser@fastmail.fm>; Sat,  7 Sep 2013 12:07:11 -0400 (EDT)\r\nReceived: from mailrelay1.theserver.net (mailrelay1.theserver.net [210.210.4.101])\r\n    by mailgate4.theserver.net (8.14.5/8.14.5) with ESMTP id r87G774w018537\r\n    for <otheruser@fastmail.fm>; Sat, 7 Sep 2013 10:07:09 -0600\r\nReceived: from localhost (localhost.localdomain [127.0.0.1])\r\n    by mailrelay1.theserver.net (Postfix) with ESMTP id 8354D27115E\r\n    for <otheruser@fastmail.fm>; Sat,  7 Sep 2013 10:07:07 -0600 (MDT)\r\nX-NIE-2-Virus-Scanner: amavisd-new at mailrelay1.theserver.net\r\nReceived: from ECS-EXG-P-CH05.win.theserver.net (ecs-exg-p-ch05.win.theserver.net [210.210.106.15])\r\n    by mailrelay1.theserver.net (Postfix) with ESMTP id 73B1C27115B\r\n    for <otheruser@fastmail.fm>; Sat,  7 Sep 2013 10:07:07 -0600 (MDT)\r\nReceived: from ECS-EXG-P-MB01.win.theserver.net ([169.254.1.76]) by\r\n ECS-EXG-P-CH05.win.theserver.net ([210.210.106.15]) with mapi id 14.03.0158.001;\r\n Sat, 7 Sep 2013 10:07:07 -0600\r\nFrom: \"User, The\" <theuser@theserver.net>\r\nTo: \"'otheruser@fastmail.fm'\" <otheruser@fastmail.fm>\r\nSubject:\r\nThread-Index: Ac6r5Ewm50Kx8q/7SmW+wzWdp9MaYw==\r\nDate: Sat, 7 Sep 2013 16:07:06 +0000\r\nMessage-ID: <532C594B7920A549A2A91CB4312CC576335E03AC@ECS-EXG-P-MB01.win.theserver.net>\r\nAccept-Language: en-US\r\nContent-Language: en-US\r\nX-MS-Has-Attach:\r\nX-MS-TNEF-Correlator:\r\nx-originating-ip: [210.210.106.201]\r\nContent-Type: text/plain; charset=\"iso-8859-1\"\r\nContent-Transfer-Encoding: quoted-printable\r\nMIME-Version: 1.0\r\nX-Proofpoint-Virus-Version: vendor=fsecure engine=2.50.10432:5.10.8794,1.0.431,0.0.0000\r\n definitions=2013-09-07_01:2013-09-06,2013-09-07,1970-01-01 signatures=0\r\n\r\n";

	var tbParanoia = utils.getTestWindow().tbParanoia;
	var headers = tbParanoia.paranoiaParseHeaderString(headersStr);
	assert.equals(32, headers.length);
	var receivedHeaders = tbParanoia.paranoiaGetReceivedHeaders(headers);
	Application.console.log(receivedHeaders);
	assert.equals(6, receivedHeaders.length);

	for(var i = 0; i < receivedHeaders.length; i++) {
		Application.console.log(receivedHeaders[i].from);
		Application.console.log(receivedHeaders[i].fromIP);
		assert.notEquals(null, receivedHeaders[i].fromIP);
	}
}
