// ==UserScript==
// @name            Gemeinsamer Stoffdatenpool Bund / Länder (GSBL) - Autologin
// @namespace       https://sd1313.myds.me/greasemonkey
// @version         1.1.1811271542
// @author          Stefan Dorn
// @contributor     UG-ÖEL Bamberg Land
// @description     Automatic log in for the service "GSBL".
// @description:de  Loggt sich automatisch beim Dienst "GSBL" ein.
// @homepage        https://sd1313.myds.me
// @icon            https://www.gsblintern.de/favicon.ico
// @supportURL      https://sd1313.myds.me
// @match           https://www.gsblintern.de/gsblweb30/login.do
// @match           https://www.gsblintern.de/gsblweb30/login.do?*
// @match           https://www.gsblintern.de/gsblweb30/loginForm.do
// @match           https://www.gsblintern.de/gsblweb30/loginForm.do?*
// @run-at          document-end
// @grant           GM_getValue
// @grant           GM_setValue
// @grant           GM_deleteValue
// @noframes
// ==/UserScript==

// START_CHANGE_LOG
//
// --- version 1.1
//  added: show version of script on site
//
// --- version 1.0
// initial version
//
// END_OF_CHANGELOG

// Variablen deklarieren
var Version = '1.1.1811271542';
var Zeitpunkt = new Date();
console.log('Skript gestartet: '+Zeitpunkt.toLocaleString());
var UsernameOK;
var PasswordOK;

// Formular
var LoginForm = document.getElementsByName('loginForm')[0];
var LoginButton = document.getElementsByClassName('button')[0];
var LoginButtonTableData = LoginButton.parentNode;
var UserName = document.getElementById('username');
var UserNameTableRow = UserName.parentNode.parentNode;
var Password = document.getElementById('password');
var PasswordTableRow = Password.parentNode.parentNode;
var NewAdditionalBtn = document.createElement('a');
var NewAdditionalDiv = document.createElement('div');

// Funktionen
function checkData()
{
  if ( GM_getValue('Username') != '' && GM_getValue('Username') != undefined) {
    UsernameOK = true;
  }
  else {
    UsernameOK = false;
  }
  if ( GM_getValue('Password') != '' && GM_getValue('Password') != undefined) {
    PasswordOK = true;
  }
  else {
    PasswordOK = false;
  }
  console.log('UsernameOK: '+UsernameOK+' PasswordOK: '+PasswordOK);
}

function saveData()
{
  if ( UserName.value != '' && Password.value != '' )
  {
    NewAdditionalBtn.childNodes[0].nodeValue = '...bitte warten...';
    LoginForm.submit();
    GM_setValue('Username',UserName.value);
    GM_setValue('Password',Password.value);
    console.log('Benutzername und Passwort wurden gespeichert.');
  }
}

function deleteData()
{
  NewAdditionalBtn.childNodes[0].nodeValue = '...bitte warten...';
  GM_deleteValue('Username');
  GM_deleteValue('Password');
  UserName.value = '';
  Password.value = '';
  console.log('Benutzername und Passwort wurden gelöscht.');
  document.location.reload();
}

checkData();
if ( UsernameOK == true && PasswordOK == true )
{
  // Benutzername
  UserName.value = unescape(GM_getValue('Username'));
  UserNameTableRow.style.display = 'none';

  // Passwort-Feld
  Password.value = unescape(GM_getValue('Password'));
  PasswordTableRow.style.display = 'none';

  // Daten löschen-Button
  var AdditionalBtnValue = document.createTextNode('Daten löschen');
  NewAdditionalBtn.appendChild(AdditionalBtnValue);
  NewAdditionalBtn.className = 'button';
  NewAdditionalBtn.id = 'AdditionalBtn';
  NewAdditionalBtn.href = '#'
  NewAdditionalBtn.addEventListener('click', deleteData, false);
  LoginButtonTableData.appendChild (NewAdditionalBtn);
  console.log('Löschen-Button angezeigt');

  }
else
{

  // Daten speichern-Button
  var AdditionalBtnValue = document.createTextNode('Anmelden & Daten speichern');
  NewAdditionalBtn.appendChild(AdditionalBtnValue);
  NewAdditionalBtn.className = 'button';
  NewAdditionalBtn.id = 'AdditionalBtn';
  NewAdditionalBtn.href = 'JavaScript:document.loginForm.submit()';
  NewAdditionalBtn.addEventListener('click', saveData, false);
  LoginButtonTableData.appendChild (NewAdditionalBtn);
  console.log('Speichern-Button angezeigt');
}
var NewText = document.createTextNode('Scriptversion: ' + Version );
NewAdditionalDiv.appendChild(NewText);
NewAdditionalDiv.style.marginTop = '2em';
NewAdditionalDiv.style.marginBottom = '2em';
LoginButtonTableData.appendChild (NewAdditionalDiv);
console.log('Scriptversion angezeigt');