import { Roboto_Flex } from "next/font/google";

export const body = Roboto_Flex({
	axes: ["slnt"],
	display: "swap",
	subsets: ["latin", "latin-ext"],
	variable: "--font-body",
});

export const heading = Roboto_Flex({
	axes: ["slnt"],
	display: "swap",
	subsets: ["latin", "latin-ext"],
	variable: "--font-heading",
});
