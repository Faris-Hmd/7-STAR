/** @format */
import { baseUrl } from "../../_app";
import { NextApiRequest, NextApiResponse } from "next";
import { getProducts } from "../../../lib/getProducts";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const url = new URL(baseUrl + req.url);
  const searchParams = url.searchParams;
  const keyword = searchParams.get("keyword");
  console.log(req.cookies);

  if (keyword === "all") {
    const products = await getProducts();
    res.status(200).json(products);
  } else {
    const products = await getProducts();
    res.status(200).json(products);
  }
}
