import axios from 'axios';
let previousCommitSHA = '';
let previousUpdatedAt = '';
let previousCommitUser = ''; 
const owner = 'BrunoSobrino';
const repo = 'TheMystic-Bot-MD';
const handler = async (m, {conn, text, usedPrefix, command}) => {
 conn.sendMessage(m.chat, {text: `*[❗] Comando activado con éxito, te notificaremos cuando haya algun cambio en el repositorio oficial.*`}, {quoted: m});  
try {
  async function checkRepoUpdates() {
    try {
      const response = await axios.get(`https://api.github.com/repos/${owner}/${repo}/commits?per_page=1`);
      const {sha, commit: {message}, html_url, author: { login } } = response.data[0];

      if (sha !== previousCommitSHA || message !== previousUpdatedAt) {
        previousCommitSHA = sha;
        previousUpdatedAt = message;
        previousCommitUser = login
        conn.sendMessage(m.chat, {text: `*[❗] ¡El repositorio ha sido actualizado!*\n*- Repositorio:* ${html_url}\n*- Mensaje de commit:* ${message}\n*- Commit por:* ${login}`}, {quoted: m});
      }
    } catch (error) {
      m.reply('*[❗] Error al verificar el repositorio:*', error.message);
    }
  }
  setInterval(checkRepoUpdates, 6000);
} catch (e) {
m.reply(e)
}
};
handler.command = /^(actualizar|actualizacion)/i;
handler.rowner = true;
export default handler;
