/**
 * Normalizes a word by removing accents, numbers, and special characters
 * Converts: ç -> c, ã/à/á/â -> a, é/ê -> e, í -> i, ó/ô/õ -> o, ú -> u
 * Removes all numerical and symbolic characters, keeping only letters
 * @param word - The word to normalize
 * @returns The normalized word without accents, numbers, or symbols
 */
export const normalizeWord = (word: string): string => {
	return word
		.replace(/[áàâã]/g, 'a')
		.replace(/[ÁÀÂÃ]/g, 'A')
		.replace(/[éê]/g, 'e')
		.replace(/[ÉÊ]/g, 'E')
		.replace(/[í]/g, 'i')
		.replace(/[Í]/g, 'I')
		.replace(/[óôõ]/g, 'o')
		.replace(/[ÓÔÕ]/g, 'O')
		.replace(/[ú]/g, 'u')
		.replace(/[Ú]/g, 'U')
		.replace(/[ç]/g, 'c')
		.replace(/[Ç]/g, 'C')
		.replace(/[^a-zA-Z]/g, ''); // Remove all non-letter characters
};
