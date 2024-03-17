export function handleKeywordForm(formData: FormData) {
    const keywords = formData.getAll("keyword") as string[];
    const newKeywords = formData.get("newKeywords")?.toString();

    // Add new keywords to keywords array
    const newKeywordArr = newKeywords?.split(", ");
    newKeywordArr?.forEach((keyword) => keywords.push(keyword));
    
    return keywords;
}