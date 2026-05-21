import io

filepath = r"f:\Web-Projects\MadinatyAI\Platform\src\data\content.ts"

with io.open(filepath, "r", encoding="utf-8") as f:
    content = f.read()

# Helper to log actions
def replace_log(old, new):
    global content
    if old in content:
        content = content.replace(old, new)
        print(f"Replaced: {repr(old)[:60]} -> {repr(new)[:60]}")
    else:
        print(f"Not found: {repr(old)[:60]}")

# --- English Replacements ---
replace_log('secondaryAction: "Join the Waitlist"', 'secondaryAction: "Register Now"')
replace_log('cta: "Join the Waitlist"', 'cta: "Register Now"')
replace_log('value: "Free", label: "For first 10 kids"', 'value: "200 EGP", label: "Special Community Rate"')
replace_log('badge: "Free · Waitlist Open",', 'badge: "200 EGP · Special Offer",')
replace_log(
    'text: "Free certified courses for ages 6–8, 9–12, and 13–15. AI basics, prompt engineering, safe tools, and critical digital thinking — at Madinaty Innovation Hub."',
    'text: "Certified courses for ages 6–8, 9–12, and 13–15 at symbolic prices. AI basics, prompt engineering, safe tools, and critical digital thinking — at Madinaty Innovation Hub."'
)
replace_log('overline: "Free Safe AI interactive session for kids",', 'overline: "Subsidized Safe AI interactive session for kids",')
replace_log(
    'subtitle: "Saturday, June 6, 2026 · 8:00 PM – 10:00 PM · Ages 8–12",',
    'subtitle: "Saturday, June 6 & June 13, 2026 · 8:00 PM – 10:00 PM · Ages 8–12",'
)
replace_log(
    'description:\n      "An interactive session teaching kids chatbot tools and how to use them safely. Each session lasts 2 hours, with a maximum of 10 children per room to ensure high-quality interaction.",',
    'description:\n      "An interactive session teaching kids chatbot tools and how to use them safely. Each session lasts 2 hours, with a maximum of 10 children per room. Special community price of 200 EGP/kid (65% off) for the first 20 signups.",'
)
replace_log(
    'promoLabel: "Hurry up to book! Low seat price for the first 20 kids",',
    'promoLabel: "Special Offer: 200 EGP/kid (65% off) for the first 20 signups",'
)
replace_log(
    'promoDescription:\n      "Priority is given to Madinaty residents. Pre-registration is mandatory.",',
    'promoDescription:\n      "Exclusively for Madinaty residents. Pre-registration is mandatory. Fee is 200 EGP per child (instead of 570 EGP) for the first 20 signups.",'
)
replace_log('labSubtitle: "Up to 65% off for Madinaty residents only",', 'labSubtitle: "10 kids per session · 200 EGP/kid · Parents drop-off only",')
replace_log(
    'stats: [\n      { value: "120", label: "minutes" },\n      { value: "10", label: "kids / session" },\n      { value: "Free", label: "Promo seats" }\n    ],',
    'stats: [\n      { value: "120", label: "minutes" },\n      { value: "10", label: "kids / session" },\n      { value: "200", label: "EGP / Special Offer" }\n    ],'
)
replace_log('{ icon: "💰", label: "Free for first 10 kids" },', '{ icon: "💰", label: "200 EGP/kid for the first 20 signups" },')
replace_log(
    'url: "https://wa.me/201026655008?text=Hello%2C%20I%20want%20to%20inquire%20about%20the%20kids%20AI%20session%20on%20June%206"',
    'url: "https://wa.me/201026655008?text=Hello%2C%20I%20want%20to%20inquire%20about%20the%20kids%20AI%20session"'
)
replace_log(
    '{ role: "ai", content: "At Triple A East Hub - 2nd Floor, Saturday June 6th at 8:00 PM. The session is free for the first 10 kids. Would you like to book a seat?" }',
    '{ role: "ai", content: "At Triple A East Hub - 2nd Floor, Saturday June 6th or Saturday June 13th at 8:00 PM. The cost is 200 EGP for the first 20 residents of Madinaty. Would you like to book a seat?" }'
)


# --- Arabic Replacements (Defined via Unicode Escapes to prevent syntax/parser issues) ---

# 1. Join Waitlist -> Register Now (انضم إلى قائمة الانتظار -> سجل الآن)
ar_join_waitlist = "\u0627\u0646\u0636\u0645 \u0625\u0644\u0649 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0627\u0646\u062a\u0638\u0627\u0631"
ar_register_now = "\u0633\u062c\u0644 \u0627\u0644\u0622\u0646"
replace_log('secondaryAction: "' + ar_join_waitlist + '"', 'secondaryAction: "' + ar_register_now + '"')
replace_log('cta: "' + ar_join_waitlist + '"', 'cta: "' + ar_register_now + '"')

# 2. Stats
ar_stats_old = 'value: "\u0645\u062c\u0627\u0646\u0627\u064b", label: "\u0644\u0623\u0648\u0644 \u0661\u0660 \u0623\u0637\u0641\u0627\u0644"'
ar_stats_new = 'value: "\u0662\u0660\u0660 \u062c.\u0645", label: "\u0639\u0631\u0636 \u062e\u0627\u0635 \u064a\u0634\u0645\u0644 \u0633\u0643\u0627\u0646 \u0645\u062f\u064a\u0646\u062a\u064a"'
replace_log(ar_stats_old, ar_stats_new)

# 3. Services Innovation Hub badge
ar_badge_old = 'badge: "\u0645\u062c\u0627\u0646\u0627\u064b \u00b7 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0627\u0646\u062a\u0638\u0627\u0631 \u0645\u0641\u062a\u0648\u062d\u0629",'
ar_badge_new = 'badge: "\u0662\u0660\u0660 \u062c.\u0645 \u00b7 \u0639\u0631\u0636 \u062e\u0627\u0635",'
replace_log(ar_badge_old, ar_badge_new)

# 4. Services Innovation Hub text
ar_hub_old = 'text: "\u0643\u0648\u0631\u0633\u0627\u062a \u0645\u062c\u0627\u0646\u064a\u0629 \u0645\u0639\u062a\u0645\u062f\u0629 \u0644\u0644\u0623\u0639\u0645\u0627\u0631 \u0666\u2013\u0668 \u0648\u066٩\u2013\u066١\u066٢ \u0648\u066١\u066٣\u2013\u066١\u066٥ \u0633\u0646\u0629. \u0623\u0633\u0627\u0633\u064a\u0627\u062a \u0627\u0644\u0630\u0643\u0627\u0621 \u0627\u0644\u0627\u0635\u0637\u0646\u0627\u0639\u064a\u060c \u0643\u062a\u0627\u0628\u0629 \u0627\u0644\u0628\u0631\u0648\u0645\u0628\u062a\u060c \u0627\u0644\u0623\u062f\u0648\u0627\u062a \u0627\u0644\u0622\u0645\u0646\u0629\u060c \u0648\u0627\u0644\u062a\u0641\u0643\u064a\u0631 \u0627\u0644\u0646\u0642\u062f\u064a \u0627\u0644\u0631\u0642\u0645\u064a \u2014 \u0641\u064a \u0645\u0631\u0643\u0632 \u0627\u0644\u0627\u0628\u062a\u0643\u0627\u0631 \u0628\u0645\u062f\u064a\u0646\u062a\u064a."'
ar_hub_new = 'text: "\u0643\u0648\u0631\u0633\u0627\u062a \u0645\u0639\u062a\u0645\u062f\u0629 \u0644\u0644\u0623\u0639\u0645\u0627\u0631 \u0666\u2013\u0668 \u0648\u066٩\u2013\u066١\u066٢ \u0648\u066١\u066٣\u2013\u066١\u066٥ \u0633\u0646\u0629 \u0628\u0623\u0633\u0639\u0627\u0631 \u0631\u0645\u0632\u064a\u0629. \u0623\u0633\u0627\u0633\u064a\u0627\u062a \u0627\u0644\u0630\u0643\u0627\u0621 \u0627\u0644\u0627\u0635\u0637\u0646\u0627\u0639\u064a\u060c \u0643\u062a\u0627\u0628\u0629 \u0627\u0644\u0628\u0631\u0648\u0645\u0628\u062a\u060c \u0627\u0644\u0623\u062f\u0648\u0627\u062a \u0627\u0644\u0622\u0645\u0646\u0629\u060c \u0648\u0627\u0644\u062a\u0641\u0643\u064a\u0631 \u0627\u0644\u0646\u0642\u062f\u064a \u0627\u0644\u0631\u0642\u0645\u064a \u2014 \u0641\u064a \u0645\u0631\u0643\u0632 \u0627\u0644\u0627\u0628\u062a\u0643\u0627\u0631 \u0628\u0645\u062f\u064a\u0646\u062a\u064a."'
replace_log(ar_hub_old, ar_hub_new)

# 5. Event subtitle
ar_sub_old = 'subtitle: "\u0627\u0644\u0633\u0628\u062a \u0666 \u064a\u0648\u0646\u064a\u0648 \u0662\u0660\u0662\u0666 \u00b7 \u066٨:\u066٠\u066٠ \u0645 \u2013 \u066١\u066٠:\u066٠\u066٠ \u0645 \u00b7 \u0623\u0639\u0645\u0627\u0631 \u066٨\u2013\u066١\u066٢",'
ar_sub_new = 'subtitle: "\u0627\u0644\u0633\u0628\u062a \u0666 \u064a\u0648\u0646\u064a\u0648 \u0648\u0627\u0644\u0633\u0628\u062a \u066١\u066٣ \u064a\u0648\u0646\u064a\u0648 \u0662\u0660\u0662\u0666 \u00b7 \u066٨:\u066٠\u066٠ \u0645 \u2013 \u066١\u066٠:\u066٠\u066٠ \u0645 \u00b7 \u0623\u0639\u0645\u0627\u0631 \u066٨\u2013\u066١\u066٢",'
replace_log(ar_sub_old, ar_sub_new)

# 6. Event description
ar_desc_old = 'description:\n      "\u062c\u0644\u0633\u0629 \u062a\u0641\u0627\u0639\u0644\u064a\u0629 \u0644\u062a\u0639\u0644\u064a\u0645 \u0627\u0644\u0623\u0637\u0641\u0627\u0644 \u0623\u062f\u0648\u0627\u062a \u0627\u0644\u0634\u0627\u062a \u0628\u0627\u0644\u0630\u0643\u0627\u0621 \u0627\u0644\u0627\u0635\u0637\u0646\u0627\u0639\u064a \u0648\u0643\u064a\u0641\u064a\u0629 \u0627\u0633\u062a\u062e\u062f\u0627\u0645\u0647\u0627 \u0628\u0623\u0645\u0627\u0646. \u0645\u062f\u0629 \u0643\u0644 \u062c\u0644\u0633\u0629 \u0633\u0627\u0639\u062a\u0627\u0646 \u0648\u0628\u062d\u062f \u0623\u0642\u0635\u0649 \u066١\u0660 \u0623\u0637\u0641\u0627\u0644 \u0641\u0642\u0637 \u062f\u0627\u062e\u0644 \u0627\u0644\u0642\u0627\u0639\u0629 \u0644\u0636\u0645\u0627\u0646 \u062c\u0648\u062f\u062a \u0627\u0644\u062a\u0641\u0627\u0639\u0644.",'
ar_desc_new = 'description:\n      "\u062c\u0644\u0633\u0629 \u062a\u0641\u0627\u0639\u0644\u064a\u0629 \u0644\u062a\u0639\u0644\u064a\u0645 \u0627\u0644\u0623\u0637\u0641\u0627\u0644 \u0623\u062f\u0648\u0627\u062a \u0627\u0644\u0634\u0627\u062a \u0628\u0627\u0644\u0630\u0643\u0627\u0621 \u0627\u0644\u0627\u0635\u0637\u0646\u0627\u0639\u064a \u0648\u0643\u064a\u0641\u064a\u0629 \u0627\u0633\u062a\u062e\u062f\u0627\u0645\u0647\u0627 \u0628\u0623\u0645\u0627\u0646. \u0645\u062f\u0629 \u0643\u0644 \u062c\u0644\u0633\u0629 \u0633\u0627\u0639\u062a\u0627\u0646 \u0648\u0628\u062d\u062f \u0623\u0642\u0635\u0649 \u066١\u0660 \u0623\u0637\u0641\u0627\u0644 \u0641\u0642\u0637 \u062f\u0627\u062e\u0644 \u0627\u0644\u0642\u0627\u0639\u0629 \u0644\u0636\u0645\u0627\u0646 \u062c\u0648\u062f\u062a \u0627\u0644\u062a\u0641\u0627\u0639\u0644. \u0633\u0639\u0631 \u062e\u0627\u0635 \u0644\u0633\u0643\u0627\u0646 \u0645\u062f\u064a\u0646\u062a\u064a \u066٢\u0660\u0660 \u062c.\u0645 \u0644\u0644\u0637\u0641\u0644 (\u062e\u0635\u0645 \u066٦\u066٥\u066a) \u0644\u0623\u0648\u0644 \u0662\u0660 \u0645\u0634\u062a\u0631\u0643.",'
replace_log(ar_desc_old, ar_desc_new)

# 7. Event promoLabel
ar_promo_old = 'promoLabel: "\u0623\u0644\u062d\u0642 \u0628\u0633\u0631\u0639\u0629 \u062a\u062d\u062c\u0632 \u0644\u0640 \u0623\u0628\u0646\u0643/\u0628\u0646\u062a\u0643.. \u0627\u0644\u0633\u0639\u0631 \u0631\u0645\u0632\u064a \u062c\u062f\u0627\u064b \u0644\u0623\u0648\u0644 \u0662\u0660 \u0645\u0634\u062a\u0631\u0643 \u0641\u0642\u0637",'
ar_promo_new = 'promoLabel: "\u0639\u0631\u0636 \u062e\u0627\u0635: \u0662\u0660\u0660 \u062c.\u0645 \u0644\u0644\u0637\u0641\u0644 (\u062e\u0635\u0645 \u066٦\u066٥\u066a) \u0644\u0623\u0648\u0644 \u0662\u0660 \u0645\u0634\u062a\u0631\u0643",'
replace_log(ar_promo_old, ar_promo_new)

# 8. Event promoDescription
ar_pdesc_old = 'promoDescription:\n      "\u0627\u0644\u0623\u0648\u0644\u0648\u064a\u0629 \u0644\u0633\u0643\u0627\u0646 \u0645\u062f\u064a\u0646\u062a\u064a\u060c \u0648\u0627\u0644\u062a\u0633\u062c\u064a\u0644 \u0627\u0644\u0645\u0633\u0628\u0642 \u0625\u0644\u0632\u0627\u0645\u064a.",'
ar_pdesc_new = 'promoDescription:\n      "\u062e\u0627\u0635 \u0628\u0633\u0643\u0627\u0646 \u0645\u062f\u064a\u0646\u062a\u064a \u0641\u0642\u0637. \u0627\u0644\u062a\u0633\u062c\u064a\u0644 \u0627\u0644\u0645\u0633\u0628\u0642 \u0625\u0644\u0632\u0627\u0645\u064a. \u0627\u0644\u0631\u0633\u0648\u0645 \u066٢\u0660\u0660 \u062c.\u0645 \u0644\u0644\u0637\u0641\u0644 (\u0628\u062f\u0644\u0627\u064b \u0645\u0646 \u066Show\u066٠ \u062c.\u0645) \u0644\u0623\u0648\u0644 \u0662\u0660 \u0645\u0634\u062a\u0631\u0643.",'
# Let's write the characters exactly without 'show' (which was probably a typo in my earlier draft)
ar_pdesc_new = 'promoDescription:\n      "\u062e\u0627\u0635 \u0628\u0633\u0643\u0627\u0646 \u0645\u062f\u064a\u0646\u062a\u064a \u0641\u0642\u0637. \u0627\u0644\u062a\u0633\u062c\u064a\u0644 \u0627\u0644\u0645\u0633\u0628\u0642 \u0625\u0644\u0632\u0627\u0645\u064a. \u0627\u0644\u0631\u0633\u0648\u0645 \u066٢\u0660\u0660 \u062c.\u0645 \u0644\u0644\u0637\u0641\u0644 (\u0628\u062f\u0644\u0627\u064b \u0645\u0646 \u0665\u0667\u066٠ \u062c.\u0645) \u0644\u0623\u0648\u0644 \u0662\u0660 \u0645\u0634\u062a\u0631\u0643.",'
replace_log(ar_pdesc_old, ar_pdesc_new)

# 9. Event labSubtitle
ar_lab_old = 'labSubtitle: " \u062a\u062e\u0641\u064a\u0636 \u064a\u0635\u0644 \u0625\u0644\u0649 \u066٦\u066٥% \u0644\u0640 \u0633\u0643\u0627\u0646 \u0645\u062f\u064a\u0646\u062a\u064a \u0641\u0642\u0637",'
ar_lab_new = 'labSubtitle: "\u0661\u0660 \u0623\u0637\u0641\u0627\u0644 \u0641\u064a \u0627\u0644\u062c\u0644\u0633\u0629 \u00b7 \u066٢\u0660\u0660 \u062c.\u0645 \u0644\u0644\u0637\u0641\u0644 \u00b7 \u0628\u062f\u0648\u0646 \u062d\u0636\u0648\u0631 \u0623\u0648\u0644\u064a\u0627\u0621 \u0627\u0644\u0623\u0645\u0648\u0631",'
replace_log(ar_lab_old, ar_lab_new)

# 10. Event stats
ar_stats_grid_old = 'stats: [\n      { value: "\u0661\u0662\u0660 ", label: "\u062f\u0642\u064a\u0642\u0629" },\n      { value: "\u0661\u0660", label: "\u0623\u0637\u0641\u0627\u0644 / \u062c\u0644\u0633\u0629" },\n      { value: "\u0662\u0660", label: "\u0645\u0642\u0639\u062f \u0628\u0633\u0631\u0639 \u0645\u062e\u0641\u0636" }\n    ],'
# wait, in the original content.ts:
# { value: "٢٠", label: "مقعد بسعر مخفض" } or similar?
# Let's search for "مقعد" to check what it is
# Let's replace the whole stats block
ar_stats_grid_old = 'stats: [\n      { value: "\u0661\u0662\u0660 ",\n        label: "\u062f\u0642\u064a\u0642\u0629"\n      },\n      { value: "\u0661\u0660",\n        label: "\u0623\u0637\u0641\u0627\u0644 / \u062c\u0644\u0633\u0629"\n      },\n      { value: "\u0662\u0660",\n        label: "\u0645\u0642\u0639\u062f \u0628\u0633\u0631\u0639 \u0645\u062e\u0641\u0636"\n      }\n    ]'
# Let's check what value it is in content.ts. We'll do a search or a simpler replace on the inner strings:
# Let's replace the single values:
replace_log('value: "\u0662\u0660", label: "\u0645\u0642\u0639\u062f \u0628\u0633\u0631\u0639 \u0645\u062e\u0641\u0636"', 'value: "\u0662\u0660\u0660", label: "\u062c.\u0645 / \u0639\u0631\u0636 \u062e\u0627\u0635"')

# 11. Event safetyBadges (200 EGP/kid)
ar_badge_item_old = '{ icon: "\ud83d\udcb0", label: "\u0627\u0644\u0643\u0648\u0631\u0633 \u0628\u0631\u0633\u0648\u0645 \u0631\u0645\u0632\u064a\u0629 \u0644\u0636\u0645\u0627\u0646 \u062c\u062f\u064a\u0629 \u0627\u0644\u062d\u062c\u0632" },'
# Let's check if the word is:
# "الكورس برسوم رمزية لضمان جدية الحجز"
# \u0627\u0644\u0643\u0648\u0631\u0633 \u0628\u0631\u0633\u0648\u0645 \u0631\u0645\u0632\u064a\u0629 \u0644\u0636\u0645\u0627\u0646 \u062c\u062f\u064a\u0629 \u0627\u0644\u062d\u062c\u0632
ar_badge_item_old = '{ icon: "\ud83d\udcb0", label: "\u0627\u0644\u0643\u0648\u0631\u0633 \u0628\u0631\u0633\u0648\u0645 \u0631\u0645\u0632\u064a\u0629 \u0644\u0636\u0645\u0627\u0646 \u062c\u062f\u064a\u0629 \u0627\u0644\u062d\u062c\u0632" }'
ar_badge_item_new = '{ icon: "\ud83d\udcb0", label: "\u0662\u0660\u0660 \u062c.\u0645 \u0644\u0644\u0637\u0641\u0644 \u0644\u0623\u0648\u0644 \u0662\u0660 \u0645\u0634\u062a\u0631\u0643 \u0645\u0646 \u0633\u0643\u0627\u0646 \u0645\u062f\u064a\u0646\u062a\u064a" }'
replace_log(ar_badge_item_old, ar_badge_item_new)

# 12. Event WhatsApp link text
ar_wa_old = 'url: "https://wa.me/201026655008?text=%D8%A3%D9%87%D9%84%D8%A7%D9%8B%D8%8C%20%D8%A3%D9%88%D8%AF%20%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%B9%D9%86%20%D8%AC%D9%84%D8%B3%D8%A9%20%D8%A7%D9%84%D8%B0%D9%83%D8%A7%D8%A1%20%D8%A7%D9%84%D8%A7%D8%B5%D8%B7%D9%86%D8%A7%D8%B1%D9%8I%20%D9%84%D9%84%D8%A3%D8%B7%D9%81%D8%A7%D9%84%20%D9%8A%D9%88%D9%84%206%20%D9%8A%D9%88%D9%86%D9%88"'
ar_wa_new = 'url: "https://wa.me/201026655008?text=%D8%A3%D9%87%D9%84%D8%A7%D9%8B%D8%8C%20%D8%A3%D9%88%D8%AF%20%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%B9%D9%86%20%D8%AC%D9%84%D8%B3%D8%A9%20%D8%A7%D9%84%D8%B0%D9%83%D8%A7%D8%A1%20%D8%A7%D9%84%D8%A7%D8%B5%D8%B7%D9%86%D8%A7%D8%B1%D9%8I%20%D9%84%D9%84%D8%A3%D8%B7%D9%81%D8%A7%D9%84"'
replace_log(ar_wa_old, ar_wa_new)

# 13. Chatbot simulation message
ar_chat_old = '{ role: "ai", content: "\u0641\u064a \u0645\u0631\u0643\u0632 (AAA) \u0625\u064a\u0633\u062a \u0647\u0628 - \u0627\u0644\u062f\u0648\u0631 \u0627\u0644\u062b\u0627\u0646\u064a\u060c \u0627\u0644\u0633\u0628\u062a \u0666 \u064a\u0648\u0646\u064a\u0648 \u0641\u064a \u062a\u0645\u0627\u0645 \u0627\u0644\u062b\u0627\u0645\u0646\u0629 \u0645\u0633\u0627\u0621\u064b. \u0627\u0644\u0641\u0639\u0627\u0644\u064a\u0629 \u0645\u062c\u0627\u0646\u064a\u0629 \u0644\u0623\u0648\u0644 \u0661\u0660 \u0623\u0637\u0641\u0627\u0644. \u0647\u0644 \u062a\u0631\u064a\u062f \u062d\u062c\u0632 \u0645\u0642\u0639\u062f\u061f" }'
ar_chat_new = '{ role: "ai", content: "\u0641\u064a \u0645\u0631\u0643\u0632 Triple A \u0625\u064a\u0633\u062a \u0647\u0628 - \u0627\u0644\u062f\u0648\u0631 \u0627\u0644\u062b\u0627\u0646\u064a\u060c \u0627\u0644\u0633\u0628\u062a \u0666 \u064a\u0648\u0646\u064a\u0648 \u0623\u0648 \u0627\u0644\u0633\u0628\u062a \u0661\u0663 \u064a\u0648\u0646\u064a\u0648 \u0641\u064a \u062a\u0645\u0627\u0645 \u0627\u0644\u062b\u0627\u0645\u0646\u0629 \u0645\u0633\u0627\u0621\u064b. \u0627\u0644\u062a\u0643\u0644\u0641\u0629 \u0662\u0660\u0660 \u062c.\u0645 \u0644\u0623\u0648\u0644 \u0662\u0660 \u0645\u0634\u062a\u0631\u0643 \u0645\u0646 \u0633\u0643\u0627\u0646 \u0645\u062f\u064a\u0646\u062a\u064a. \u0647\u0644 \u062a\u0631\u064a\u062f \u062d\u062c\u0632 \u0645\u0642\u0639\u062f\u061f" }'
replace_log(ar_chat_old, ar_chat_new)

with io.open(filepath, "w", encoding="utf-8") as f:
    f.write(content)

print("Safe content update complete!")
