const nodemailer=require('nodemailer');
const {google}=require('googleapis');

const CLIENT_ID='1007178038771-e6iopa1tc3convrl8k0jion31a45qfat.apps.googleusercontent.com';
const CLIENT_SECRET='pSP7PRjL4zbKp6I6PAFjAmpm';
const REDIRECT_URI='https://developers.google.com/oauthplayground';
const REFRESH_TOKEN='1//04oSLRIRVimIrCgYIARAAGAQSNwF-L9IrzsZjOEn7QTfwhvP6eaAPyaFLQdu-AvZwJHqU_vQpkZa2nhvoS_GsVeXhC1VqKTzrpfE';

const oAuth2Client=new google.auth.OAuth2(CLIENT_ID,CLIENT_SECRET,REDIRECT_URI);
oAuth2Client.setCredentials({refresh_token: REFRESH_TOKEN});

async function sendMail(){
    try{
        const ACCESS_TOKEN=await oAuth2Client.getAccessToken();
        const transport=nodemailer.createTransport({
            service:'gmail',
            auth:{
                type: 'OAuth2',
                user: 'rjgame18@gmail.com',
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: ACCESS_TOKEN
            }
        })
        const mailOptions={
            from:'Rahul Joshi <rjgame18@gmail.com>',
            to:'tj18022826@gmail.com',
            subject: "hllo form node",
            text:"howz you",
            html:"<h1>howz you in html</h1>"
        }

        const result=await transport.sendMail(mailOptions);
        return result;
    }catch(error){
        return error;
    }
}

sendMail()
    .then(result=>console.log('Email sent...',result))
    .catch(error=>console.log(error.mesage))