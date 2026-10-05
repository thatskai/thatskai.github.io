const SMALL_TEXT_MAP = createSmallTextMap();

function createSmallTextMap() {
    const map = new Map();

    const normal = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const small  = "ᴀʙᴄᴅᴇꜰɢʜɪᴊᴋʟᴍɴᴏᴘǫʀѕᴛᴜᴠᴡxʏᴢᴀʙᴄᴅᴇꜰɢʜɪᴊᴋʟᴍɴᴏᴘǫʀѕᴛᴜᴠᴡxʏᴢ₀₁₂₃₄₅₆₇₈₉";

    for (let i = 0; i < normal.length; i++) {
        map.set(normal[i], small[i]);
    }

    return map;
}

function getSmallText(text) {
    if (!text) return "";

    let result = "";

    for (const c of text) {
        result += SMALL_TEXT_MAP.get(c) ?? c;
    }

    return result;
}

const input = document.getElementById("input");
const output = document.getElementById("output");
const copyButton = document.getElementById("copy");

input.addEventListener("input", () => {
    output.value = getSmallText(input.value);
});

copyButton.addEventListener("click", async () => {
    if (!output.value) return;

    try {
        await navigator.clipboard.writeText(output.value);
    } catch {
        // fallback for browsers without clipboard API
        output.select();
        document.execCommand("copy");
    }

    copyButton.textContent = "Copiato!";
    setTimeout(() => copyButton.textContent = "Copia", 1500);
});
