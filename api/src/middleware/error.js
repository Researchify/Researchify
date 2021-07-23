function fillErrorObject(code, msg, err) {
    const tzoffset = new Date().getTimezoneOffset() * 60000;
    const localISOTime = new Date(Date.now() - tzoffset)
      .toISOString();
    const errObject = {
      errorCode: code,
      errorMessage: msg,
      errors: [...err],
      errorTimestamp: localISOTime
    };
    // console.log(errObject);

    return errObject;
}

module.exports = { fillErrorObject };