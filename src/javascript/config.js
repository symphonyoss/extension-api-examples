fs = require('fs');

var server = 'nexus2.symphony.com';
//server = 'nexus.symphony.com';
//server = 'sym-nexus2-dev-ause1-all.symphony.com';
//server = 'nexus-dev-ause1-all.symphony.com';
//server = 'qa3.symphony.com';
//server = 'qa3-qa-ause1-aha1.symphony.com';

module.exports = {
    keyUrl: 'https://' + server + ':8444/keyauth',
    sessionUrl: 'https://' + server + ':8444/sessionauth',
    agentUrl: 'https://' + server + ':443/agent',
    podUrl: 'https://' + server + ':443/pod',
    auth: {
        cert: fs.readFileSync(__dirname + '/certs/bot.user1-cert.pem', {encoding: 'utf-8'}),
        key: fs.readFileSync(__dirname + '/certs/bot.user1-key.pem', {encoding: 'utf-8'}),
        passphrase: 'changeit',
    },
    gmailCredentials: {"web":{"client_id":"899965776709-fi4maljh527illqlv32h5mbka0j4m318.apps.googleusercontent.com","project_id":"named-purpose-161615","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://accounts.google.com/o/oauth2/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_secret":"CS6Kr6cijyxZCAAiUuohgNu2","redirect_uris":["https://local-dev.symphony.com:8080/inbox/services/auth/gmail"],"javascript_origins":["https://local-dev.symphony.com:8080"]}}
};
