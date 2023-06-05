const kafka = require("../kafka/client");

const make_request = async function (requestData, res, topic_name) {
  kafka.make_request(topic_name, requestData, function (err, results) {
    if (err) {
      const status = err.status ? err.status : 500;
      res.status(status).json({
        msg: err.message,
      });
    } else {
      res.status(200).json(results);
      res.end();
    }
  });
};

module.exports = make_request;
