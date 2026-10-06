// Provided helper: it works, and you don't need to read or understand it for this activity.

export function parseXML(content: string, recordTag: string): Record<string, string>[] {
	const stripped = content.replace(/<\?xml[^?]*\?>/g, "").replace(/<!--[\s\S]*?-->/g, "");

	const recordPattern = new RegExp(`<${recordTag}(?=[\\s>])([^>]*)>([\\s\\S]*?)<\\/${recordTag}>`, "g");

	const records: Record<string, string>[] = [];

	for (const match of stripped.matchAll(recordPattern)) {
		const [, attrsRaw, body] = match;
		const record: Record<string, string> = {};

		for (const m of attrsRaw.matchAll(/(\w[\w-]*)=["']([^"']*)["']/g)) {
			record[m[1]] = decodeEntities(m[2]);
		}

		for (const m of body.matchAll(/<(\w[\w-]*)>([^<]*)<\/\1>/g)) {
			record[m[1]] = decodeEntities(m[2].trim());
		}

		records.push(record);
	}

	return records;
}

function decodeEntities(text: string): string {
	return text
		.replace(/&amp;/g, "&")
		.replace(/&lt;/g, "<")
		.replace(/&gt;/g, ">")
		.replace(/&quot;/g, '"')
		.replace(/&apos;/g, "'");
}
