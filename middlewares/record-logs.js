module.exports = function recordLogs(req, res, next) {
  console.log(
    `[${req.ip}] ${new Date().toISOString()} - ${req.method} ${req.headers.host}${
      req.path
    } - ${req.headers['user-agent']}`,
  );
  next();
};
