export default function validateOnlyNumbers(input: string): boolean {
	return /^\d+$/.test(input);
}
