const { WebClient } = require('@slack/web-api');

const token = process.env.SLACK_TOKEN;

const web = new WebClient(token);

export default (req, res) => {
  res.status(200);

  if (!req.body || !req.body.event) {
    res.send();
    return;
  }

  const {
    type,
    challenge,
    channel,
    text: input,
  } = req.body.event;

  if (type === 'url_verification' && challenge) {
    console.log('Callenge received');
    res.json({ challenge });
  }

  if (type === 'app_mention') {
    let text = 'All aboard!';

    if (input.includes('help')) {
      text = 'All Hands on Deck!'
    }

    web.chat
      .postMessage({ text, channel })
      .finally(() => { res.send(); });
  }
};
