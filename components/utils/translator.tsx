export default async function translateText(text : string | undefined | null, sourceLang : string, targetLang : string) {
    console.log(sourceLang)
    console.log(targetLang)
    const response = await fetch("https://libretranslate.com/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        q: text,
        source: sourceLang,
        target: targetLang
      }),
    });
  
    const data = await response.json();
    console.log(data);
  }
  
