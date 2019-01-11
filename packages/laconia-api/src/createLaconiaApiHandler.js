const laconia = require("@laconia/core");

module.exports = (
  inputConverterFactory,
  outputConverterFactory,
  options = {}
) => {
  return app => {
    return laconia(async (event, laconiaContext) => {
      const input = await inputConverterFactory(laconiaContext).convert(event);
      const output = options.headers
        ? await app(input.payload, input.headers, laconiaContext)
        : await app(input.payload, laconiaContext);

      return outputConverterFactory(laconiaContext).convert(output);
    });
  };
};