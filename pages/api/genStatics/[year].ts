import { NextApiRequest, NextApiResponse } from "next";

import getStaticties from "../../../lib/getStaticteis";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const year = req.query.year;
  console.log(year);
  const st = await getStaticties(year.toString());
  res.status(200).json(st);
}
