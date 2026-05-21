import io
import json

replacements = [
    # English Event
    (
        'subtitle: "Sat 6 June 2026 · 8:00pm–10:00pm · Ages 8–12",',
        'subtitle: "Saturday, June 6 & June 13, 2026 · 8:00 PM – 10:00 PM · Ages 8–12",'
    ),
    (
        '"An interactive session teaching kids AI chat tools and how to use them safely. Each session runs for 2 hours with up to 10 kids per group (without parents inside) to ensure quality interaction."',
        '"An interactive session teaching kids chatbot tools and how to use them safely. Each session lasts 2 hours, with a maximum of 10 children per room. Special community price of 200 EGP/kid (65% off) for the first 20 signups."'
    ),
    (
        'promoLabel: "Hurry — discounted price up to 65% for the first 20 subscribers",',
        'promoLabel: "Special Offer: 200 EGP/kid (65% off) for the first 20 signups",'
    ),
    (
        '"Priority is for Madinaty residents. Pre-registration is mandatory."',
        '"Exclusively for Madinaty residents. Pre-registration is mandatory. Fee is 200 EGP per child (instead of 570 EGP) for the first 20 signups."'
    ),
    (
        '{ value: "20", label: "Discounted Seats" }',
        '{ value: "200 EGP", label: "Special Offer" }'
    ),
    (
        '{ icon: "💰", label: "Discounted price for the first 20 subscribers" },',
        '{ icon: "💰", label: "200 EGP/kid for the first 20 signups" },'
    ),
    (
        'url: "https://wa.me/201026655008?text=Hello%2C%20I%27d%20like%20to%20register%20for%20the%20AI%20Kids%20session%20on%20June%206th"',
        'url: "https://wa.me/201026655008?text=Hello%2C%20I%20want%20to%20inquire%20about%20the%20kids%20AI%20session"'
    ),
]

js_code = """const fs = require('fs');
const path = require('path');

const filepath = path.join(__dirname, '..', 'src', 'data', 'content.ts');
let content = fs.readFileSync(filepath, 'utf8');

function replaceText(oldStr, newStr) {
  if (content.includes(oldStr)) {
    content = content.split(oldStr).join(newStr);
    console.log("Replaced successfully: " + oldStr.substring(0, 40));
  } else {
    console.log("Not found: " + oldStr.substring(0, 40));
  }
}
"""

for old, new in replacements:
    old_json = json.dumps(old, ensure_ascii=True)
    new_json = json.dumps(new, ensure_ascii=True)
    js_code += f'\nreplaceText({old_json}, {new_json});'

js_code += "\n\nfs.writeFileSync(filepath, content, 'utf8');\nconsole.log('Done modifying content.ts!');\n"

with io.open("f:\\Web-Projects\\MadinatyAI\\Platform\\scratch\\update_content.js", "w", encoding="utf-8") as f:
    f.write(js_code)

print("Generated update_content.js successfully!")
