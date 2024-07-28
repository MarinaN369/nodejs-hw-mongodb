export const ctrlWrapper = (controller) => {
    return async (req, res, next) => {
      try {
        await controller(req, res, next);
      } catch (err) {
        console.error("An error occurred:", err);
        next(err);
      }
    };
  };
