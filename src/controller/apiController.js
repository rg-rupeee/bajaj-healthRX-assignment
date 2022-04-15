function isNumber(str) {
  return !isNaN(str);
}

exports.bfhlController = async (req, res, next) => {
  const { data } = req.body;

  if (!data) {
    const err = new Error();
    err.message = "please provide data";
    err.status = 400;
    return next(err);
  }

  if(!Array.isArray(data)){
    const err = new Error();
    err.message = "data should be in form of array";
    err.status = 400;
    return next(err);
  }

  console.log(data);

  const numbers = [];
  const alphabets = [];

  for (const value of data) {
    if (isNumber(value)) {
      numbers.push(value);
    } else {
      alphabets.push(value);
    }
  }

  return res.json({
    is_success: true,
    user_id: "Rupesh_Garhwal_03092000",
    email: "rupeshgarhwal3920@gmail.com",
    roll_number: "0832CS191148",
    numbers,
    alphabets,
  });
};
