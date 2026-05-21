import re

filepath = r"f:\Web-Projects\MadinatyAI\Platform\src\data\content.ts"

with open(filepath, "r", encoding="utf-8") as f:
    content = f.read()

# --- English Content Replacements ---

# 1. Join the Waitlist -> Register Now
content = content.replace("secondaryAction: \"Join the Waitlist\"", "secondaryAction: \"Register Now\"")
content = content.replace("cta: \"Join the Waitlist\"", "cta: \"Register Now\"")

# 2. Hero dashboardStats Free -> 200 EGP
content = content.replace(
    'value: "Free", label: "For first 10 kids"',
    'value: "200 EGP", label: "Special Community Rate"'
)

# 3. Services Innovation Hub badge
content = content.replace(
    'badge: "Free · Waitlist Open",',
    'badge: "200 EGP · Special Offer",'
)

# 4. Services Innovation Hub text
content = content.replace(
    'text: "Free certified courses for ages 6–8, 9–12, and 13–15. AI basics, prompt engineering, safe tools, and critical digital thinking — at Madinaty Innovation Hub."',
    'text: "Certified courses for ages 6–8, 9–12, and 13–15 at symbolic prices. AI basics, prompt engineering, safe tools, and critical digital thinking — at Madinaty Innovation Hub."'
)

# 5. Event overline
content = content.replace(
    'overline: "Free Safe AI interactive session for kids",',
    'overline: "Subsidized Safe AI interactive session for kids",'
)

# 6. Event subtitle
content = content.replace(
    'subtitle: "Saturday, June 6, 2026 · 8:00 PM – 10:00 PM · Ages 8–12",',
    'subtitle: "Saturday, June 6 & June 13, 2026 · 8:00 PM – 10:00 PM · Ages 8–12",'
)

# 7. Event description
content = content.replace(
    'description:\n      "An interactive session teaching kids chatbot tools and how to use them safely. Each session lasts 2 hours, with a maximum of 10 children per room to ensure high-quality interaction.",',
    'description:\n      "An interactive session teaching kids chatbot tools and how to use them safely. Each session lasts 2 hours, with a maximum of 10 children per room. Special community price of 200 EGP/kid (65% off) for the first 20 signups.",'
)

# 8. Event promoLabel
content = content.replace(
    'promoLabel: "Hurry up to book! Low seat price for the first 20 kids",',
    'promoLabel: "Special Offer: 200 EGP/kid (65% off) for the first 20 signups",'
)

# 9. Event promoDescription
content = content.replace(
    'promoDescription:\n      "Priority is given to Madinaty residents. Pre-registration is mandatory.",',
    'promoDescription:\n      "Exclusively for Madinaty residents. Pre-registration is mandatory. Fee is 200 EGP per child (instead of 570 EGP) for the first 20 signups.",'
)

# 10. Event labSubtitle
content = content.replace(
    'labSubtitle: "Up to 65% off for Madinaty residents only",',
    'labSubtitle: "10 kids per session · 200 EGP/kid · Parents drop-off only",'
)

# 11. Event stats
content = content.replace(
    'stats: [\n      { value: "120", label: "minutes" },\n      { value: "10", label: "kids / session" },\n      { value: "Free", label: "Promo seats" }\n    ],',
    'stats: [\n      { value: "120", label: "minutes" },\n      { value: "10", label: "kids / session" },\n      { value: "200", label: "EGP / Special Offer" }\n    ],'
)

# 12. Event safetyBadges (200 EGP/kid)
content = content.replace(
    '{ icon: "💰", label: "Free for first 10 kids" },',
    '{ icon: "💰", label: "200 EGP/kid for the first 20 signups" },'
)

# 13. Event WhatsApp link text
content = content.replace(
    'url: "https://wa.me/201026655008?text=Hello%2C%20I%20want%20to%20inquire%20about%20the%20kids%20AI%20session%20on%20June%206"',
    'url: "https://wa.me/201026655008?text=Hello%2C%20I%20want%20to%20inquire%20about%20the%20kids%20AI%20session"'
)

# 14. Chatbot simulation message
content = content.replace(
    '{ role: "ai", content: "At Triple A East Hub - 2nd Floor, Saturday June 6th at 8:00 PM. The session is free for the first 10 kids. Would you like to book a seat?" }',
    '{ role: "ai", content: "At Triple A East Hub - 2nd Floor, Saturday June 6th or Saturday June 13th at 8:00 PM. The cost is 200 EGP for the first 20 residents of Madinaty. Would you like to book a seat?" }'
)


# --- Arabic Content Replacements ---

# 1. انضم إلى قائمة الانتظار -> سجل الآن
content = content.replace("secondaryAction: \"انضم إلى قائمة الانتظار\"", "secondaryAction: \"سجل الآن\"")
content = content.replace("cta: \"انضم إلى قائمة الانتظار\"", "cta: \"سجل الآن\"")

# 2. Hero dashboardStats
content = content.replace(
    'value: "مجاناً", label: "لأول ١٠ أطفال"',
    'value: "٢٠٠ ج.م", label: "عرض خاص لسكان مدينتي"'
)

# 3. Services Innovation Hub badge
content = content.replace(
    'badge: "مجاناً · قائمة الانتظار مفتوحة",',
    'badge: "٢٠٠ ج.م · عرض خاص",'
)

# 4. Services Innovation Hub text
content = content.replace(
    'text: "كورسات مجانية معتمدة للأعمار ٦–٨ و٩–١٢ و١٣–١٥ سنة. أساسيات الذكاء الاصطناعي، كتابة البرومبت، الأدوات الآمنة، والتفكير النقدي الرقمي — في مركز الابتكار بمدينتي."',
    'text: "كورسات معتمدة للأعمار ٦–٨ و٩–١٢ و١٣–١٥ سنة بأسعار رمزية. أساسيات الذكاء الاصطناعي، كتابة البرومبت، الأدوات الآمنة، والتفكير النقدي الرقمي — في مركز الابتكار بمدينتي."'
)

# 5. Event subtitle
content = content.replace(
    'subtitle: "السبت ٦ يونيو ٢٠٢٦ · ٨:٠٠ م – ١٠:٠٠ م · أعمار ٨–١٢",',
    'subtitle: "السبت ٦ يونيو والسبت ١٣ يونيو ٢٠٢٦ · ٨:٠٠ م – ١٠:٠٠ م · أعمار ٨–١٢",'
)

# 6. Event promoLabel
content = content.replace(
    'promoLabel: "ألحق بسرعة تحجز لـ أبنك/بنتك.. السعر رمزي جداً لأول ٢٠ مشترك فقط",',
    'promoLabel: "عرض خاص: ٢٠٠ ج.م للطفل (خصم ٦٥٪) لأول ٢٠ مشترك",'
)

# 7. Event promoDescription
content = content.replace(
    'promoDescription:\n      "الأولوية لسكان مدينتي، والتسجيل المسبق إلزامي.",',
    'promoDescription:\n      "خاص بسكان مدينتي فقط. التسجيل المسبق إلزامي. الرسوم ٢٠٠ ج.م للطفل (بدلاً من ٥٧٠ ج.م) لأول ٢٠ مشترك.",'
)

# 8. Event labSubtitle
content = content.replace(
    'labSubtitle: " تخفيض يصل إلى ٦٥% لـ سكان مدينتي فقط",',
    'labSubtitle: "١٠ أطفال في الجلسة · ٢٠٠ ج.م للطفل · بدون حضور أولياء الأمور",'
)

# 9. Event stats
content = content.replace(
    'stats: [\n      { value: "١٢٠ ", label: "دقيقة" },\n      { value: "١٠", label: "أطفال / جلسة" },\n      { value: "٢٠", label: "مقعد بسعر مخفض" }\n    ],',
    'stats: [\n      { value: "١٢٠ ", label: "دقيقة" },\n      { value: "١٠", label: "أطفال / جلسة" },\n      { value: "٢٠٠", label: "ج.م / عرض خاص" }\n    ],'
)

# 10. Event safetyBadges (200 EGP/kid)
content = content.replace(
    '{ icon: "💰", label: "الكورس برسوم رمزية لضمان جدية الحجز" },',
    '{ icon: "💰", label: "٢٠٠ ج.م للطفل لأول ٢٠ مشترك من سكان مدينتي" },'
)

# 11. Event WhatsApp link text
content = content.replace(
    'url: "https://wa.me/201026655008?text=%D8%A3%D9%87%D9%84%D8%A7%D9%8B%D8%8C%20%D8%A3%D9%88%D8%AF%20%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%B9%D9%86%20%D8%AC%D9%84%D8%B3%D8%A9%20%D8%A7%D9%84%D8%B0%D9%83%D8%A7%D8%A1%20%D8%A7%D9%84%D8%A7%D8%B5%D8%B7%D9%86%D8%A7%D8%B1%D9%8I%20%D9%84%D9%84%D8%A3%D8%B7%D9%81%D8%A7%D9%84%20%D9%8A%D9%88%D9%84%206%20%D9%8A%D9%88%D9%86%D9%88"',
    'url: "https://wa.me/201026655008?text=%D8%A3%D9%87%D9%84%D8%A7%D9%8B%D8%8C%20%D8%A3%D9%88%D8%AF%20%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%B9%D9%86%20%D8%AC%D9%84%D8%B3%D8%A9%20%D8%A7%D9%84%D8%B0%D9%83%D8%A7%D8%A1%20%D8%A7%D9%84%D8%A7%D8%B5%D8%B7%D9%86%D8%A7%D8%B1%D9%8I%20%D9%84%D9%84%D8%A3%D8%B7%D9%81%D8%A7%D9%84"'
)

# 12. Chatbot simulation message
content = content.replace(
    '{ role: "ai", content: "في مركز (AAA) إيست هب - الدور الثاني، السبت ٦ يونيو في تمام الثامنة مساءً. الفعالية مجانية لأول ١٠ أطفال. هل تريد حجز مقعد؟" }',
    '{ role: "ai", content: "في مركز Triple A إيست هب - الدور الثاني، السبت ٦ يونيو أو السبت ١٣ يونيو في تمام الثامنة مساءً. التكلفة ٢٠٠ ج.م لأول ٢٠ مشترك من سكان مدينتي. هل تريد حجز مقعد؟" }
)

with open(filepath, "w", encoding="utf-8") as f:
    f.write(content)

print("Content updated successfully!")
