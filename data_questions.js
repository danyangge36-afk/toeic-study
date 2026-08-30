/* TOEIC 高分学习助手 - 题库与备考资料数据 */
/* eslint-disable */
"use strict";

/* ============ 听力 Part 1 照片描述（无照片时用场景文字代替，TTS 朗读四个选项） ============ */
const P1_DATA = [
  {
    scene: "建筑工地上，几名工人戴着安全帽正在搬运材料，一辆卡车停在旁边。",
    choices: [
      "The workers are wearing hard hats.",
      "The truck is being washed.",
      "The building has been completed.",
      "The men are painting a fence."
    ],
    answer: 0,
    explain: "听到选项后快速区分动作主体与动作：照片中工人正在搬运材料且戴着安全帽。B、C、D 的动作均未发生。"
  },
  {
    scene: "会议室里，一名女士站在投影屏幕前做演示，其他人坐在桌边听。",
    choices: [
      "The woman is cleaning the screen.",
      "The men are moving the table.",
      "The audience is watching a presentation.",
      "The room is being painted."
    ],
    answer: 2,
    explain: "P1 常见陷阱：用【正确的人 + 错误的动作】。现场是 presentation（演示），观众在观看。"
  },
  {
    scene: "机场到达大厅，一些旅客正站在行李传送带旁等候行李。",
    choices: [
      "The travelers are boarding an airplane.",
      "Some people are waiting at the baggage carousel.",
      "The luggage is being sold at a discount.",
      "The airport is under construction."
    ],
    answer: 1,
    explain: "boarding（登机）发生在出发大厅；此处是到达大厅的 baggage carousel（行李传送带）。"
  },
  {
    scene: "书店里，一名店员正在把新书摆上书架，几位顾客在浏览。",
    choices: [
      "The customers are arguing with the staff.",
      "The store is displaying electronics.",
      "The shelves are being stocked with books.",
      "The clerk is ringing up a purchase."
    ],
    answer: 2,
    explain: "be being + 过去分词（进行时被动）是 P1 高频结构：书架正被摆上书 = being stocked。"
  },
  {
    scene: "修车厂里，一名技师正俯身检查汽车引擎。",
    choices: [
      "The car is being washed.",
      "The mechanic is inspecting the engine.",
      "The garage is being renovated.",
      "The driver is parking the car."
    ],
    answer: 1,
    explain: "inspect（检查）符合技师俯身查看引擎的动作；wash（洗车）是经典干扰项。"
  },
  {
    scene: "公园里，一对夫妇正沿着湖边的小路慢跑，狗在他们身后跑。",
    choices: [
      "The couple is swimming in the lake.",
      "The dog is sleeping under a tree.",
      "People are jogging along the path.",
      "The park is closed for maintenance."
    ],
    answer: 2,
    explain: "jog along the path（沿小路慢跑）。P1 干扰项常把地点或动作换掉：swimming / sleeping 均与照片不符。"
  },
  {
    scene: "咖啡店里，一名服务员端着放有饮料的托盘走向窗边的餐桌。",
    choices: [
      "The server is carrying a tray of drinks.",
      "The customers are washing dishes.",
      "The menu is being rewritten.",
      "The chairs are stacked on the tables."
    ],
    answer: 0,
    explain: "carry a tray（端托盘）是核心动作；洗碗、收椅子都是员工打烊时才做的事。"
  },
  {
    scene: "图书馆里，一名男子坐在电脑前打字，桌上堆着几本书。",
    choices: [
      "The man is shelving the books.",
      "A man is typing on a computer.",
      "The library is closed for the day.",
      "The woman is borrowing a laptop."
    ],
    answer: 1,
    explain: "照片核心动作是 typing（打字）；shelving（上架）是图书馆员的动作，用来引诱。"
  },
  {
    scene: "街道上，一名邮递员正把一叠信件投进路边的邮筒。",
    choices: [
      "The mail carrier is delivering a package indoors.",
      "Pedestrians are crossing the street in a line.",
      "The mailbox is being emptied by a worker.",
      "A postal worker is placing letters into a mailbox."
    ],
    answer: 3,
    explain: "投信是 placing letters into a mailbox；C 的 emptied（清空邮筒）动作方向相反，是最强干扰。"
  },
  {
    scene: "超市里，一名女子踮脚伸手从高层货架上拿一个罐头。",
    choices: [
      "The woman is paying at the register.",
      "A woman is reaching for a can on the shelf.",
      "The store clerk is mopping the floor.",
      "The shopping carts are parked outside."
    ],
    answer: 1,
    explain: "reach for（伸手去拿）是本图核心动作；paying 发生在收银台。"
  },
  {
    scene: "工厂车间里，两名穿着工作服的工人正在操作一台大型机器。",
    choices: [
      "The workers are operating machinery.",
      "The machines are being sold at auction.",
      "The engineers are drawing blueprints.",
      "The factory is under construction."
    ],
    answer: 0,
    explain: "operate machinery（操作机器）。注意 machine 相关干扰：出售、画图纸、建厂房都不符。"
  },
  {
    scene: "办公室里，几名员工围在白板前开会，其中一人正用笔在白板上写字。",
    choices: [
      "The employees are leaving the office.",
      "The manager is writing on a whiteboard.",
      "The staff are having a meal together.",
      "The presentation has just ended."
    ],
    answer: 1,
    explain: "write on a whiteboard 对应图中写字动作；围在白板前 ≠ 吃饭或离开。"
  }
];

/* ============ 听力 Part 2 问答（3 选 1） ============ */
const P2_DATA = [
  { q: "Where is the nearest bus stop?", choices: ["Around the corner, next to the bank.", "Yes, it is very near.", "By bus."], answer: 0, explain: "Where 问地点 → 选地点。C 用 by bus 回答了 How，是经典干扰。" },
  { q: "Who is responsible for ordering office supplies?", choices: ["Every Monday morning.", "That is Ms. Park's job.", "At the supply room."], answer: 1, explain: "Who 问人 → 选人。A 回答 When，C 回答 Where。" },
  { q: "When does the train to Boston leave?", choices: ["At quarter past nine.", "From Platform 3.", "It takes two hours."], answer: 0, explain: "When 问时间 → 选时间。B 是 Where 的答案，C 回答 How long。" },
  { q: "Why was the meeting postponed?", choices: ["In the main conference room.", "Until next Friday.", "The manager is out of town."], answer: 2, explain: "Why 问原因 → 选理由。A 回答 Where，B 回答 Until when。" },
  { q: "Did you finish the quarterly report?", choices: ["Yes, it is quarterly.", "I will send it to you by five.", "Once every three months."], answer: 1, explain: "Yes/No 问题的答案常省略 Yes/No，直接给信息。A、C 重复了 quarterly，无意义。" },
  { q: "What time does the store open?", choices: ["Ten on weekdays.", "For about an hour.", "Stationery and toys."], answer: 0, explain: "What time 问钟点。B 回答 How long，C 回答 What（卖什么）。" },
  { q: "How did you get to the conference?", choices: ["It was very informative.", "I took the expressway.", "Tomorrow at noon."], answer: 1, explain: "How 问方式 → 选交通方式。A 是对会议本身的评价。" },
  { q: "Would you like coffee or tea?", choices: ["Tea, please.", "Yes, I would.", "The coffee machine is broken."], answer: 0, explain: "选择疑问句不能用 Yes/No 回答，要在选项中选一个。" },
  { q: "Could you forward me that e-mail?", choices: ["Sure, what is your address?", "I received it yesterday.", "It was forwarded to me."], answer: 0, explain: "Could you...? 是请求 → 接受请求并询问必要信息。" },
  { q: "Is Mr. Kim in the office today?", choices: ["No, he is at the client site until Thursday.", "Yes, it is in the office.", "He works on the fifth floor."], answer: 0, explain: "B 有语法错误；C 回答 Where。A 直接回答并补充信息，最佳。" },
  { q: "How long will the renovation take?", choices: ["Two weeks ago.", "About two weeks.", "It started in April."], answer: 1, explain: "How long 问持续时间 → about + 时间段。A 是过去时间点。" },
  { q: "Where should I put these boxes?", choices: ["They were shipped last week.", "For about a month.", "Leave them by the elevator."], answer: 2, explain: "Where 问地点 → 指令/地点。A 回答 When（寄出时间）。" },
  { q: "What did you think of the presentation?", choices: ["Very impressive, especially the charts.", "At two o'clock.", "Mr. Lee gave it."], answer: 0, explain: "What did you think of...? 问评价 → 给出评价。B 回答 When。" },
  { q: "Who called this morning?", choices: ["Someone from the printer company.", "At around ten o'clock.", "On the office phone."], answer: 0, explain: "Who 问人 → 选人。B、C 分别回答 When 和 Where（用哪部电话）。" },
  { q: "Why is the copy machine out of order?", choices: ["In the copy room.", "The repairman is coming soon.", "It needs a new part."], answer: 2, explain: "Why 问原因 → 故障原因。B 是解决办法，不是原因。" },
  { q: "Have you met the new accountant?", choices: ["Not yet, she starts on Monday.", "Yes, in the accounting software.", "She met the deadline."], answer: 0, explain: "现在完成时问经历 → Not yet + 补充信息是最佳答案。" },
  { q: "Which elevator goes to the lobby?", choices: ["The one on the left.", "To the first floor.", "Every ten minutes."], answer: 0, explain: "Which 问哪一个 → 指别。B 看似合理但没指出是哪部电梯。" },
  { q: "How much does membership cost?", choices: ["Once a year.", "Ninety dollars a year.", "With a credit card."], answer: 1, explain: "How much 问价格 → 选金额。A 回答 How often，C 回答支付方式。" },
  { q: "Let's take a break before the next session.", choices: ["Good idea, I need some fresh air.", "The session starts at noon.", "I already took the train."], answer: 0, explain: "陈述+建议（Let's...）→ 用同意/评价回应，而不是答非所问。" },
  { q: "Should we take the highway or the local road?", choices: ["It is two kilometers away.", "The highway is faster at this hour.", "We took a taxi last time."], answer: 1, explain: "选择疑问句 → 在两者中给出建议并说理由。" },
  { q: "How often is the department meeting held?", choices: ["Once a month.", "In the meeting room.", "Yes, every department."], answer: 0, explain: "How often 问频率 → 频率短语。C 用 Yes 回答了非 Yes/No 问题。" },
  { q: "Whose laptop is this?", choices: ["On the desk.", "It belongs to Mr. Park.", "A brand new model."], answer: 1, explain: "Whose 问归属 → belongs to sb。A 回答 Where，C 回答 What kind。" },
  { q: "Would you mind if I opened the window?", choices: ["Not at all, go ahead.", "Yes, the window is open.", "The office is very cold."], answer: 0, explain: "Would you mind 的礼貌回应：不介意 → Not at all, go ahead。" },
  { q: "What do you do at the company?", choices: ["I work in product development.", "At nine every morning.", "The headquarters building."], answer: 0, explain: "What do you do 问职业/职责 → 部门或职责。" },
  { q: "Aren't you attending the award ceremony?", choices: ["The award ceremony is held annually.", "Yes, he attended it last year.", "I am, but I'll arrive a little late."], answer: 2, explain: "否定疑问句：回答先表态（I am），再补充信息，不要被 Aren't 带偏。" },
  { q: "When is the deadline for applications?", choices: ["At the reception desk.", "By the last day of June.", "It took two weeks."], answer: 1, explain: "When 问时间 → by + 日期（截止）。A 回答 Where。" },
  { q: "Can you tell me where the archive room is?", choices: ["It's down the hall, next to the stairs.", "Yes, the archive is very important.", "I told you where it was yesterday."], answer: 0, explain: "嵌入式疑问句（Can you tell me where...）回答的是内嵌的 where 问题 → 地点。" },
  { q: "Who should I contact about the invoice error?", choices: ["The invoice total is incorrect.", "Last Wednesday afternoon.", "Try the billing department."], answer: 2, explain: "Who 问联系人 → 部门/人。A 只重复了问题内容。" },
  { q: "Why don't we order lunch from the deli?", choices: ["Good idea, I'm starving.", "The deli is on Main Street.", "He ordered a sandwich."], answer: 0, explain: "Why don't we...? 是建议 → 用 Good idea 回应。" },
  { q: "Is this seat taken?", choices: ["No, go right ahead.", "Yes, I often take the train.", "The meeting starts at noon."], answer: 0, explain: "Is this seat taken?（有人坐吗）→ No, go ahead（没人，请坐）。" },
  { q: "How many people signed up for the workshop?", choices: ["In Room 204.", "Around forty so far.", "The workshop fee is fifty dollars."], answer: 1, explain: "How many 问数量 → 数字短语。" },
  { q: "That new intern is doing a great job, isn't he?", choices: ["He started last month.", "The internship ends in August.", "He certainly is."], answer: 2, explain: "反意疑问句（isn't he?）→ 用 Yes/同意回应：He certainly is。" },
  { q: "Where can I get a copy of the annual report?", choices: ["It was printed in color.", "From the admin office.", "Three copies were made."], answer: 1, explain: "Where → 领取地点。C 答非所问（多少份不是在哪拿）。" },
  { q: "Do you know if the parking garage is open on Sundays?", choices: ["I believe it is, until six p.m.", "Yes, I parked there on Sunday.", "The garage has three levels."], answer: 0, explain: "Do you know if...? 回答给信息（开放到几点），不用只回 Yes。" },
  { q: "What's the weather like out there?", choices: ["I like sunny weather best.", "It's starting to rain.", "Just outside the building."], answer: 1, explain: "What's the weather like 问天气现状 → 描述天气。" },
  { q: "Could you give me a hand with these boxes?", choices: ["Sure, where do you want them?", "My hands are full right now.", "The boxes arrived this morning."], answer: 0, explain: "give me a hand = 帮忙 → 接受并追问细节。" },
  { q: "How long have you worked here?", choices: ["From Monday to Friday.", "At the Osaka branch.", "About three years now."], answer: 2, explain: "How long + 现在完成时 → 时间段。" },
  { q: "The elevator is out of order again.", choices: ["It stops on every floor.", "Then let's take the stairs.", "Yes, I took the elevator up."], answer: 1, explain: "陈述句（坏消息）→ 合理回应：那就走楼梯。" },
  { q: "Which of these two designs do you prefer?", choices: ["The one with the blue background.", "I prefer designing to painting.", "Both designers joined last year."], answer: 0, explain: "Which + 范围 → 指出其中一个。" },
  { q: "Sorry to interrupt, but you have a phone call.", choices: ["The phone rang twice.", "He interrupted the meeting.", "Thanks, I'll take it in my office."], answer: 2, explain: "通知来电 → 感谢并说明去哪接听。" }
];

/* ============ 听力 Part 3 对话（每组 3 题） ============ */
const P3_DATA = [
  {
    title: "对话 1 · 交货延迟",
    script: [
      "M: Lisa, did the print paper we ordered arrive? We are almost out.",
      "W: No, the supplier called this morning. The delivery was delayed because of the storm last night.",
      "M: That is a problem. The sales team needs it for tomorrow's customer catalogs.",
      "W: I will ask them to send it by express courier. It should arrive by nine a.m.",
      "M: Good. And please e-mail me the updated invoice if the shipping fee changed.",
      "W: Sure. I will also check if we can get a discount on the next order."
    ],
    questions: [
      { q: "What problem does the woman mention?", choices: ["A delayed delivery", "A lost invoice", "A canceled order"], answer: 0, explain: "关键词 delayed because of the storm。" },
      { q: "What will the woman do first?", choices: ["Reprint the catalogs", "Arrange express shipping", "Call another supplier"], answer: 1, explain: "send it by express courier = 安排快递。" },
      { q: "What does the man ask for by e-mail?", choices: ["The updated invoice", "The storm damage report", "The courier's phone number"], answer: 0, explain: "please e-mail me the updated invoice。" }
    ]
  },
  {
    title: "对话 2 · 面试改期",
    script: [
      "W: Good morning, may I speak to Mr. Sato? I am calling about your interview with our design team.",
      "M: Yes, it is scheduled for Thursday at two p.m., right?",
      "W: Actually, the interviewer has to attend a client meeting that afternoon. Could you come on Friday at ten instead?",
      "M: Friday at ten works. Should I bring my portfolio?",
      "W: Yes, and please arrive fifteen minutes early to fill out some paperwork at the reception desk.",
      "M: No problem. I will bring an extra copy of my resume as well."
    ],
    questions: [
      { q: "Why is the interview time changed?", choices: ["The applicant requested a different day", "The interviewer has a client meeting", "The office will be closed on Thursday"], answer: 1, explain: "the interviewer has to attend a client meeting。" },
      { q: "What does the man agree to bring?", choices: ["A completed application form", "His portfolio", "Reference letters"], answer: 1, explain: "Should I bring my portfolio? — Yes。" },
      { q: "What does the woman ask the man to do?", choices: ["Arrive early to complete paperwork", "E-mail his resume in advance", "Call the reception desk later"], answer: 0, explain: "arrive fifteen minutes early to fill out some paperwork。" }
    ]
  },
  {
    title: "对话 3 · 年末聚会",
    script: [
      "M: Maria, the planning committee wants your opinion on the year-end party.",
      "W: Sure. Last year's restaurant was too small for everyone, though the food was excellent.",
      "M: That is why we are looking at the Grand Hotel ballroom this time. It seats one hundred fifty people.",
      "W: Perfect. But hotels are usually expensive. What is the budget per person?",
      "M: About four thousand yen, including drinks. The hotel offered a group discount if we book by Friday.",
      "W: Then let's confirm the booking today. I will e-mail the committee right away."
    ],
    questions: [
      { q: "What is the problem with last year's venue?", choices: ["The food was poor", "It was too small", "It was far from the office"], answer: 1, explain: "too small for everyone。" },
      { q: "What discount does the hotel offer?", choices: ["A lower rate for early booking", "Free drinks for everyone", "A reduced fee for members"], answer: 0, explain: "a group discount if we book by Friday = 提前预订优惠。" },
      { q: "What will the woman do next?", choices: ["Visit the hotel in person", "E-mail the committee", "Prepare the invitations"], answer: 1, explain: "I will e-mail the committee right away。" }
    ]
  },
  {
    title: "对话 4 · 空调维修",
    script: [
      "W: This is Yuki from the front office. The air conditioner in conference room B is not working again.",
      "M: Again? We replaced a part just last month. Let me check the service history... It is still under warranty, so the repair should be free.",
      "W: Great. We have a client presentation there tomorrow morning.",
      "M: A technician can come this afternoon between two and four. Will someone be in the room?",
      "W: I will be there. And I will move the afternoon meeting to the cafeteria just in case."
    ],
    questions: [
      { q: "What is the woman reporting?", choices: ["A broken air conditioner", "A lost service contract", "A water leak in the cafeteria"], answer: 0, explain: "The air conditioner is not working again。" },
      { q: "Why will the repair be free?", choices: ["The equipment is under warranty", "The company paid for a service plan", "The part was replaced last month"], answer: 0, explain: "It is still under warranty。" },
      { q: "What will the woman do?", choices: ["Cancel the client presentation", "Wait in conference room B", "Move a meeting to the cafeteria"], answer: 2, explain: "move the afternoon meeting to the cafeteria。" }
    ]
  },
  {
    title: "对话 5 · 酒店预订变更",
    script: [
      "M: Hello, I would like to change my reservation. I booked a single room for three nights from the twelfth.",
      "W: Certainly, sir. May I have your name? ... Thank you, Mr. Chen. How would you like to change it?",
      "M: My business trip is one day longer. I would like to extend my stay until the sixteenth, and switch to a twin room.",
      "W: Let me see... The twin room is available for those dates at the same nightly rate. Breakfast is not included, though.",
      "M: That is fine. How much would it be altogether?",
      "W: With the corporate discount, it comes to fifty-two thousand yen for four nights."
    ],
    questions: [
      { q: "Why does the man call?", choices: ["To cancel a reservation", "To change a reservation", "To confirm a payment"], answer: 1, explain: "I would like to change my reservation。" },
      { q: "What does the woman say about breakfast?", choices: ["It is included in the rate", "It is not included", "It is served until ten a.m."], answer: 1, explain: "Breakfast is not included, though。" },
      { q: "How much will the man pay?", choices: ["13,000 yen", "39,000 yen", "52,000 yen"], answer: 2, explain: "数字题：52,000 yen for four nights，注意别被 3 nights 或单价干扰。" }
    ]
  },
  {
    title: "对话 6 · 项目提前",
    script: [
      "W: Mr. Diaz, the client moved the launch date forward by one week. They want everything done by the twentieth now.",
      "M: The twentieth? That is very tight. We still need to finish the packaging design and get it approved.",
      "W: I know. Can your team handle the design by this Friday?",
      "M: Yes, if I get two more designers. What about the client's approval process?",
      "W: I will ask them to review it over the weekend instead of during the week.",
      "M: OK. Then we can still make it. I will send you our revised schedule today."
    ],
    questions: [
      { q: "What change did the client make?", choices: ["They increased the budget", "They moved the launch date earlier", "They added new product features"], answer: 1, explain: "moved the launch date forward = 提前。" },
      { q: "What does the man need to finish on time?", choices: ["Two more designers", "A new packaging supplier", "Extra office space"], answer: 0, explain: "Yes, if I get two more designers。" },
      { q: "What does the woman offer to do?", choices: ["Design the packaging herself", "Ask the client to review on the weekend", "Extend the deadline"], answer: 1, explain: "ask them to review it over the weekend。" }
    ]
  },
  {
    title: "对话 7 · 培训课程",
    script: [
      "M: Hi, Anna. Did you attend the Excel training on Tuesday?",
      "W: I did, but I had to leave early for a customer call, so I missed the part about charts.",
      "M: There is a second session on Thursday morning. It covers the same material.",
      "W: That would help. Is it in the small training room again?",
      "M: No, too many people signed up this time, so it moved to the auditorium on the third floor.",
      "W: Good to know. I will register online before the seats fill up."
    ],
    questions: [
      { q: "Why did the woman leave the first session early?", choices: ["She had to call a customer", "She felt sick", "The session ended early"], answer: 0, explain: "I had to leave early for a customer call。" },
      { q: "What is different about Thursday's session?", choices: ["The location", "The instructor", "The course material"], answer: 0, explain: "moved to the auditorium on the third floor。" },
      { q: "What will the woman do?", choices: ["Register online", "Buy a textbook", "Cancel the customer call"], answer: 0, explain: "I will register online before the seats fill up。" }
    ]
  },
  {
    title: "对话 8 · 退货退款",
    script: [
      "W: Excuse me. I bought this coffee machine online last week, but it stopped working yesterday.",
      "M: I am sorry to hear that. Do you have the receipt and the original box?",
      "W: Yes, here they are. I would like a refund rather than a replacement.",
      "M: Of course. Returns within thirty days get a full refund. It will go back to your card within five business days.",
      "W: That is fine. Do I need to fill out a form?",
      "M: Just this one at the counter. You will receive a confirmation e-mail once it is processed."
    ],
    questions: [
      { q: "What does the woman want?", choices: ["A full refund", "A replacement part", "A store credit"], answer: 0, explain: "I would like a refund rather than a replacement。" },
      { q: "What does the man say about the refund?", choices: ["It requires a receipt", "It takes five business days", "It is only for members"], answer: 1, explain: "within five business days 回到卡内。" },
      { q: "What will the woman receive by e-mail?", choices: ["A discount coupon", "A confirmation message", "A shipping label"], answer: 1, explain: "a confirmation e-mail once it is processed。" }
    ]
  },
  {
    title: "对话 9 · 差旅报销",
    script: [
      "W: Mr. Suzuki, I noticed your travel expenses from the Tokyo trip have not been submitted yet.",
      "M: Oh, right. I kept all the receipts, but I am not sure which form to use.",
      "W: Use the new online system. The paper forms were discontinued last month. Just scan the receipts and attach them.",
      "M: I see. Is there a deadline for this month's cycle?",
      "W: Submissions close on the twenty-fifth, and reimbursement takes about two weeks after that.",
      "M: Then I will do it today. The hotel receipt is in my other jacket, though."
    ],
    questions: [
      { q: "What does the woman say changed last month?", choices: ["The reimbursement deadline", "The expense reporting system", "The travel policy"], answer: 1, explain: "paper forms were discontinued, 改用 online system。" },
      { q: "When does Mr. Suzuki need to submit by?", choices: ["The twenty-fifth", "In two weeks", "Today at noon"], answer: 0, explain: "Submissions close on the twenty-fifth。two weeks 是报销到账时间。" },
      { q: "What does the man say he cannot find?", choices: ["His credit card", "The hotel receipt", "The online form"], answer: 1, explain: "The hotel receipt is in my other jacket。" }
    ]
  },
  {
    title: "对话 10 · 寄重要文件",
    script: [
      "M: Good morning. I would like to send this package to our Osaka office.",
      "W: Sure. Regular mail takes three days; express arrives tomorrow morning.",
      "M: Tomorrow, please. It contains contract originals, so it is urgent.",
      "W: Then I would recommend adding insurance. It costs six hundred yen for documents valued up to one hundred thousand yen.",
      "M: Yes, let's do that. Do you need me to fill out a form?",
      "W: Just this slip with the recipient's address and your extension number."
    ],
    questions: [
      { q: "Why does the man choose express delivery?", choices: ["Regular mail costs more", "The package contains urgent documents", "He is leaving for Osaka"], answer: 1, explain: "It contains contract originals, so it is urgent。" },
      { q: "What does the woman suggest adding?", choices: ["Tracking service", "Insurance", "Gift wrapping"], answer: 1, explain: "I would recommend adding insurance。" },
      { q: "What information does the man write on the slip?", choices: ["The package value", "His flight number", "The recipient's address"], answer: 2, explain: "this slip with the recipient's address and your extension number。" }
    ]
  },
  {
    title: "对话 11 · 采购加急",
    script: [
      "W: The printer toner we ordered is still out of stock at our usual supplier.",
      "M: Really? We have a big printing job for the sales conference next week.",
      "W: Exactly. I found another vendor with the same model at a slightly higher price, but delivery is within two days.",
      "M: Let's take it. The price difference is small compared with missing the conference.",
      "W: OK, I will place the order now and ask them to confirm by e-mail.",
      "M: Good. And order two extra packs so we do not run into this again."
    ],
    questions: [
      { q: "What is the problem?", choices: ["The printer broke down", "The toner is out of stock", "The conference was canceled"], answer: 1, explain: "out of stock at our usual supplier。" },
      { q: "Why will they accept the higher price?", choices: ["The quality is better", "Fast delivery matters for the conference", "The usual vendor raised its prices"], answer: 1, explain: "delivery is within two days + next week 的印刷任务。" },
      { q: "What does the man ask the woman to order in addition?", choices: ["Two extra packs", "A new printer", "Conference brochures"], answer: 0, explain: "order two extra packs。" }
    ]
  },
  {
    title: "对话 12 · 新员工工位",
    script: [
      "M: Emi, the new accountant starts on Monday. Where should she sit?",
      "W: The desk by the window on the third floor is empty now that Kenji transferred.",
      "M: Is not that area reserved for the design team, though?",
      "W: They moved to the fifth floor in April, so the whole row is open. The accounting team is right across the aisle.",
      "M: Perfect. I will ask IT to set up a computer and phone there by Friday.",
      "W: And remember to request her access card. She will need it for the third-floor door."
    ],
    questions: [
      { q: "Where will the new accountant sit?", choices: ["On the fifth floor", "By the window on the third floor", "Next to the design team"], answer: 1, explain: "The desk by the window on the third floor。" },
      { q: "Why is the desk empty?", choices: ["Kenji transferred", "The design team moved in", "It is being repaired"], answer: 0, explain: "empty now that Kenji transferred。" },
      { q: "What will the man ask IT to do?", choices: ["Print an access card", "Set up a computer and phone", "Move a desk upstairs"], answer: 1, explain: "ask IT to set up a computer and phone。" }
    ]
  }
];

/* ============ 听力 Part 4 短文（每篇 3 题） ============ */
const P4_DATA = [
  {
    title: "广播 1 · 机场广播",
    type: "机场广播",
    script: "Attention all passengers. This is an announcement for Flight J-L 412 to Singapore. Boarding will begin at ten twenty-five at Gate eighteen. Please have your boarding pass and passport ready. Passengers with young children or those who need special assistance may board first. We remind all travelers that carry-on luggage is limited to one bag. The departure time has been changed from ten forty-five to eleven o'clock due to weather conditions. Thank you for your cooperation.",
    questions: [
      { q: "What is the purpose of the announcement?", choices: ["To report a gate change", "To announce boarding information", "To offer a hotel voucher"], answer: 1, explain: "主题题： boarding will begin...。" },
      { q: "Who may board first?", choices: ["Business-class passengers", "Passengers with young children", "Members of the airline club"], answer: 1, explain: "Passengers with young children... may board first。" },
      { q: "Why was the departure time changed?", choices: ["Weather conditions", "A late crew", "Maintenance work"], answer: 0, explain: "due to weather conditions。" }
    ]
  },
  {
    title: "广播 2 · 电话留言",
    type: "电话留言",
    script: "Hi David, it's Michelle. I'm calling about tomorrow's branch visit. The manager I was supposed to meet had to fly to the Osaka office this morning, so our meeting is postponed until next Tuesday at two p.m. Also, the warehouse tour I wanted to arrange will not be possible this week because of the inventory count. Instead, could you send me the latest sales figures before Friday? I need them for the quarterly report. Call me back at your office number when you get this. Thanks.",
    questions: [
      { q: "Why was the meeting postponed?", choices: ["The manager traveled to Osaka", "Michelle is sick", "The warehouse is closed"], answer: 0, explain: "had to fly to the Osaka office。" },
      { q: "What does Michelle ask David to do?", choices: ["Reschedule the warehouse tour", "Send sales figures", "Visit the branch on Tuesday"], answer: 1, explain: "could you send me the latest sales figures。" },
      { q: "What does Michelle need the figures for?", choices: ["The quarterly report", "The inventory count", "The branch newsletter"], answer: 0, explain: "I need them for the quarterly report。" }
    ]
  },
  {
    title: "广播 3 · 电话录音",
    type: "电话录音",
    script: "Thank you for calling Northside Appliance Repair. Our office hours are Monday through Saturday, from nine a.m. to six p.m. We are closed on Sundays and public holidays. If you are calling to schedule a repair, please press one and have your product model number ready. For billing questions, press two. To speak with a service representative, please stay on the line; the current waiting time is approximately ten minutes. You may also visit our website to book an appointment and receive a ten percent discount on your first service.",
    questions: [
      { q: "What are the office hours on Saturday?", choices: ["Nine to six", "Ten to five", "Closed all day"], answer: 0, explain: "Monday through Saturday, from nine to six。" },
      { q: "What should a caller do to schedule a repair?", choices: ["Press one", "Press two", "Send an e-mail"], answer: 0, explain: "to schedule a repair, please press one。" },
      { q: "What discount is offered on the website?", choices: ["10 percent off the first service", "Free shipping on parts", "20 percent off the second visit"], answer: 0, explain: "a ten percent discount on your first service。" }
    ]
  },
  {
    title: "广播 4 · 导览解说",
    type: "导览解说",
    script: "Good morning, everyone, and welcome to the Riverside Museum. My name is Karen, and I will be your guide today. Before we enter, a few reminders: photography is allowed, but please do not use flash near the paintings. Food and drinks must remain in the cafe area. Our tour lasts about ninety minutes, and we will visit the new sculpture hall first. At noon, there will be a special demonstration by local artists in the main courtyard, which is free for all ticket holders. If you get separated from the group, please wait at the information desk near the main entrance.",
    questions: [
      { q: "What does the guide tell visitors to do?", choices: ["Avoid flash photography", "Leave bags at the entrance", "Buy tickets at the cafe"], answer: 0, explain: "please do not use flash near the paintings。" },
      { q: "What will happen at noon?", choices: ["The museum closes", "An artist demonstration begins", "Lunch is served"], answer: 1, explain: "a special demonstration by local artists。" },
      { q: "What should visitors do if separated from the group?", choices: ["Return to the bus", "Wait at the information desk", "Call the guide's office"], answer: 1, explain: "wait at the information desk。" }
    ]
  },
  {
    title: "广播 5 · 天气预报",
    type: "天气预报",
    script: "And now the local weather report. A cold front moving in from the north will bring heavy snow to the metropolitan area starting tonight around ten p.m. Snowfall may reach thirty centimeters by tomorrow morning, and strong winds are expected along the coast. Residents are advised to avoid unnecessary travel, as several train lines may suspend service. The city has announced that all community centers will open as warming shelters at eight p.m. Temperatures will rise above freezing by tomorrow afternoon, and conditions are expected to improve by the weekend.",
    questions: [
      { q: "When will the snow begin?", choices: ["Tonight around ten p.m.", "Tomorrow morning", "This afternoon"], answer: 0, explain: "starting tonight around ten p.m。" },
      { q: "What does the city announce?", choices: ["Schools will close", "Community centers will open", "All trains will stop"], answer: 1, explain: "community centers will open as warming shelters。" },
      { q: "When are conditions expected to improve?", choices: ["By tomorrow afternoon", "By the weekend", "Within a month"], answer: 1, explain: "expected to improve by the weekend。" }
    ]
  },
  {
    title: "广播 6 · 电台广告",
    type: "电台广告",
    script: "Do you want to speak English with confidence? At Brightway Language School, our business English courses focus on real workplace skills: meetings, presentations, and e-mail writing. Classes are small, with a maximum of eight students, so every learner gets personal attention. Enroll this month and receive a free level assessment plus a twenty percent discount on your first three months. We are open on weekdays until nine p.m., so you can study even after work. Visit our website or call zero-three, five-five-five-five, zero-one-nine-two. Brightway: English for your career.",
    questions: [
      { q: "What is being advertised?", choices: ["A language school", "A job agency", "An online bookstore"], answer: 0, explain: "Brightway Language School。" },
      { q: "What is the maximum class size?", choices: ["Four", "Eight", "Twelve"], answer: 1, explain: "a maximum of eight students。" },
      { q: "What discount is offered?", choices: ["Free textbooks", "20 percent off three months", "A free trial class"], answer: 1, explain: "twenty percent discount on your first three months。" }
    ]
  },
  {
    title: "广播 7 · 访客安排留言",
    type: "电话留言",
    script: "Hello, this is Rika from the head office. I am calling to confirm next Tuesday's branch visit. Our director, Mr. Ono, will arrive at your office at ten a.m. — thirty minutes later than we first discussed. He would like to tour the new warehouse before the lunch meeting, so please have a hard hat ready for him. Also, he prefers not to discuss the budget figures during the group session; save those for the one-on-one at three p.m. If the schedule needs adjusting, call me back at extension four-five-zero-two. Thank you.",
    questions: [
      { q: "What time will Mr. Ono arrive?", choices: ["9:30", "10:00", "10:30"], answer: 1, explain: "at ten a.m.（三十分钟延误是相对原计划 9:30 的干扰）。" },
      { q: "What does the caller ask the branch to prepare?", choices: ["A budget report", "A hard hat", "Lunch reservations"], answer: 1, explain: "have a hard hat ready（参观仓库用）。" },
      { q: "When should the budget figures be discussed?", choices: ["During the group session", "At the three p.m. meeting", "At the warehouse tour"], answer: 1, explain: "save those for the one-on-one at three p.m。" }
    ]
  },
  {
    title: "广播 8 · 牙科诊所录音",
    type: "电话录音",
    script: "Thank you for calling Sakura Dental Clinic. If you are calling to make, change, or cancel an appointment, please press one. Our hours are weekdays from nine to six-thirty, and Saturdays from nine to one. We are closed on Sundays and national holidays. For emergencies such as severe pain or a broken tooth, press two now to be connected to our emergency line; after-hours calls are transferred to the on-call dentist. Please note that same-day appointments are limited, so we recommend booking online, where you can also view available time slots. Your call is important to us.",
    questions: [
      { q: "What are the clinic's Saturday hours?", choices: ["9:00 to 1:00", "9:00 to 6:30", "Closed all day"], answer: 0, explain: "Saturdays from nine to one。" },
      { q: "What should a caller with a broken tooth do?", choices: ["Press one", "Press two", "Book online"], answer: 1, explain: "emergencies such as severe pain or a broken tooth → press two。" },
      { q: "What does the message recommend for same-day appointments?", choices: ["Coming before nine", "Calling after six", "Booking online"], answer: 2, explain: "we recommend booking online。" }
    ]
  },
  {
    title: "广播 9 · 大楼停电通知",
    type: "内部广播",
    script: "May I have your attention, please? This Saturday, the building's electrical system will be inspected, and power to floors three through six will be shut off from eight a.m. until approximately noon. Employees who plan to work on those floors should relocate to the second-floor meeting rooms, which will remain open. The elevator will not stop at those floors during the outage, so please use the stairs if you need to pass through. The cafeteria and all first-floor services are unaffected. We apologize for the inconvenience and thank you for your cooperation.",
    questions: [
      { q: "Which floors will lose power?", choices: ["Floors one and two", "Floors three through six", "All floors"], answer: 1, explain: "power to floors three through six will be shut off。" },
      { q: "Where should affected employees work?", choices: ["At home", "In second-floor meeting rooms", "In the cafeteria"], answer: 1, explain: "relocate to the second-floor meeting rooms。" },
      { q: "What will happen to the elevator?", choices: ["It will not stop at the affected floors", "It will be out of service all day", "It will run normally"], answer: 0, explain: "The elevator will not stop at those floors during the outage。" }
    ]
  },
  {
    title: "广播 10 · 餐厅周年庆广告",
    type: "电台广告",
    script: "Celebrate with us! The Harbor View Restaurant turns twenty this month, and you are invited to our anniversary week. From Monday through Friday, all lunch courses are half price, and every dinner guest receives a free dessert. Win a dinner for two: simply post a photo of your favorite dish with the tag Harbor View Twenty. Ten winners will be chosen each Friday. We are open every day from eleven a.m. to ten p.m., on the third floor of the Marine Tower building, next to the fountain plaza. Reservations are recommended. Call zero-three, one-two-three-four, five-six-seven-eight, or book through our website. Harbor View: twenty years by the sea.",
    questions: [
      { q: "What is being celebrated?", choices: ["The restaurant's twentieth anniversary", "A new menu launch", "The tower's opening"], answer: 0, explain: "turns twenty this month... anniversary week。" },
      { q: "What special offer applies to dinner guests?", choices: ["Half-price courses", "A free dessert", "A twenty percent coupon"], answer: 1, explain: "half price 是午餐；晚餐送 free dessert。" },
      { q: "How can customers win a dinner for two?", choices: ["By posting a photo with a tag", "By reserving a table early", "By signing up for membership"], answer: 0, explain: "post a photo with the tag Harbor View Twenty。" }
    ]
  }
];

/* ============ 阅读 Part 5 短文填空（4 选 1） ============ */
const P5_DATA = [
  { q: "The quarterly report ______ by the accounting department every Friday.", choices: ["prepares", "is prepared", "preparing", "is preparing"], answer: 1, explain: "report 是被「准备」→ 一般现在时被动语态 is prepared。", tag: "时态与语态" },
  { q: "Ms. Lee has been ______ to the Singapore office.", choices: ["transfer", "transferred", "transferring", "transferable"], answer: 1, explain: "has been + 过去分词 = 现在完成时被动，表示被调动。", tag: "时态与语态" },
  { q: "All employees must submit their expense reports ______ Friday.", choices: ["by", "until", "since", "during"], answer: 0, explain: "「不晚于某时间点」用 by；until 强调持续到某时。", tag: "介词" },
  { q: "The seminar was ______ informative that we extended the question period.", choices: ["such", "so", "very", "too"], answer: 1, explain: "so + 形容词 + that 固定结构。", tag: "固定结构" },
  { q: "Because of the heavy rain, the delivery arrived ______ than expected.", choices: ["late", "later", "more late", "lately"], answer: 1, explain: "有 than 用比较级 later；lately 意为「最近」。", tag: "比较级" },
  { q: "______ the client approves the design, we will begin production.", choices: ["When", "While", "During", "Whatever"], answer: 0, explain: "时间/条件状语从句；During 是介词不能接从句。", tag: "连词" },
  { q: "The copier ______ yesterday has broken again.", choices: ["repaired", "was repaired", "repairing", "which repaired"], answer: 0, explain: "reduced relative：the copier (that was) repaired yesterday。B 会造成双谓语。", tag: "分词与从句" },
  { q: "Ms. Perez, ______ is our new financial analyst, will join the meeting.", choices: ["that", "whom", "which", "who"], answer: 3, explain: "非限定定语从句指人做主语 → who；先行词后不能用 that。", tag: "关系词" },
  { q: "Please contact me ______ you have any questions.", choices: ["whether", "if", "despite", "unless"], answer: 1, explain: "「如果有问题请联系我」→ if 条件句。", tag: "连词" },
  { q: "The marketing team is working hard to ______ sales in Asia.", choices: ["increase", "increasing", "increased", "increases"], answer: 0, explain: "to + 动词原形构成不定式表目的。", tag: "动词形式" },
  { q: "Employees ______ wear safety helmets in the warehouse at all times.", choices: ["can", "must", "might", "would"], answer: 1, explain: "at all times 表示强制规定 → must。", tag: "情态动词" },
  { q: "The hotel ______ we stayed last week has excellent reviews.", choices: ["which", "that", "where", "when"], answer: 2, explain: "stay 是不及物动词（stay at the hotel）→ 地点关系副词 where。", tag: "关系词" },
  { q: "______ Mr. Tanaka nor his assistant was able to attend the conference.", choices: ["Neither", "Either", "Both", "Not"], answer: 0, explain: "neither... nor 固定搭配；谓语就近一致用 was。", tag: "固定结构" },
  { q: "The new software is compatible ______ all major operating systems.", choices: ["for", "with", "to", "of"], answer: 1, explain: "compatible with 固定搭配。", tag: "介词搭配" },
  { q: "If the shipment ______ delayed, please notify the customer immediately.", choices: ["will be", "is", "would be", "were"], answer: 1, explain: "条件从句用一般现在时，不用 will/would。", tag: "条件句" },
  { q: "The receptionist gave the visitors ______ about local restaurants.", choices: ["inform", "informative", "information", "informed"], answer: 2, explain: "gave + 间宾 + 直宾 → 需要名词 information。", tag: "词性" },
  { q: "Mr. Cho has worked for this company ______ 2015.", choices: ["for", "since", "from", "in"], answer: 1, explain: "since + 过去时间点；for + 时间段。", tag: "介词" },
  { q: "The board members discussed ______ the headquarters to a larger city.", choices: ["relocate", "to relocating", "relocating", "relocated"], answer: 2, explain: "discuss 后接动名词 doing，不接不定式。", tag: "动名词" },
  { q: "The shipping fee is ______ in December than in other months.", choices: ["high", "higher", "highest", "more high"], answer: 1, explain: "有 than 用比较级 higher。", tag: "比较级" },
  { q: "The annual banquet ______ place at the Grand Hotel this year.", choices: ["takes", "taking", "taken", "take"], answer: 0, explain: "take place 固定短语，主语单数 → takes。", tag: "固定短语" },
  { q: "We regret ______ you that your application was not successful.", choices: ["informing", "to inform", "informed", "inform"], answer: 1, explain: "regret to do（遗憾地要做，告知坏消息）vs regret doing（后悔做过）。", tag: "不定式" },
  { q: "The manager suggested ______ the deadline by two days.", choices: ["extend", "extending", "to extending", "extended"], answer: 1, explain: "suggest + doing；suggest to do 是错误用法。", tag: "动名词" },
  { q: "Applicants ______ submit a cover letter along with their resume.", choices: ["are required to", "require to", "required", "are requiring"], answer: 0, explain: "be required to do 被要求做某事。", tag: "被动语态" },
  { q: "The flight to Chicago has been ______ because of the snowstorm.", choices: ["canceled", "canceling", "cancel", "cancellation"], answer: 0, explain: "has been + 过去分词，现在完成时被动。", tag: "时态与语态" },
  { q: "______ of the two proposals did the committee approve?", choices: ["What", "Which", "Who", "Whose"], answer: 1, explain: "在给定范围内选择用 Which；What 是开放性提问。", tag: "疑问词" },
  { q: "Mr. Ibrahim is in charge ______ the sales department.", choices: ["of", "for", "with", "to"], answer: 0, explain: "in charge of 固定搭配。", tag: "介词搭配" },
  { q: "The employees enjoyed ______ at the company picnic.", choices: ["they", "their", "themselves", "them"], answer: 2, explain: "enjoy oneself 固定搭配，用反身代词。", tag: "代词" },
  { q: "No sooner had the meeting started ______ the power went out.", choices: ["when", "than", "that", "then"], answer: 1, explain: "no sooner... than 固定搭配，注意与 hardly... when 区分。", tag: "固定结构" },
  { q: "This year's revenue is ______ higher than last year's.", choices: ["significant", "significantly", "significance", "signify"], answer: 1, explain: "修饰形容词 higher 用副词 significantly。", tag: "词性" },
  { q: "Please ensure that all doors ______ locked before leaving.", choices: ["are", "be", "being", "to be"], answer: 0, explain: "that 从句需要完整谓语 → are locked。", tag: "从句" },
  { q: "The proposal was rejected ______ its high estimated cost.", choices: ["because", "because of", "although", "despite"], answer: 1, explain: "because of + 名词短语；because + 从句。", tag: "连词" },
  { q: "______ of the three candidates performed well in the interview.", choices: ["Both", "All", "Every", "Either"], answer: 1, explain: "三者及以上用 all；both/either 只用于两者。", tag: "代词" },
  { q: "The technician finished the repairs ______ than we expected.", choices: ["more quickly", "quicklier", "most quickly", "quickly"], answer: 0, explain: "多音节副词比较级 more quickly；quicklier 不存在。", tag: "比较级" },
  { q: "Please ______ the contract carefully before signing it.", choices: ["review", "reviewing", "to review", "reviewed"], answer: 0, explain: "祈使句以动词原形开头。", tag: "祈使句" },
  { q: "The accountant ______ the figures when the power went out.", choices: ["checked", "was checking", "has checked", "checks"], answer: 1, explain: "过去进行时表示过去某时正在进行的动作。", tag: "时态" },
  { q: "The seminar room can ______ up to fifty people.", choices: ["accommodate", "accommodation", "accommodating", "accommodates"], answer: 0, explain: "can + 动词原形。", tag: "动词形式" },
  { q: "______ the weather improves, the outdoor ceremony will be moved indoors.", choices: ["Unless", "If", "Although", "Whether"], answer: 0, explain: "unless = 如果不：天气不转好就移到室内。", tag: "条件句" },
  { q: "The consultant's report was ______ detailed and easy to follow.", choices: ["neither", "either", "both", "not"], answer: 2, explain: "both... and... 连接两个并列形容词。", tag: "固定结构" },
  { q: "All prices are ______ to change without notice.", choices: ["subject", "subjected", "subjective", "subjection"], answer: 0, explain: "be subject to（可能受……影响）固定搭配，注意与 be subjected to 区分。", tag: "固定搭配" },
  { q: "The manager asked me ______ the report by Thursday.", choices: ["finish", "finishing", "to finish", "finished"], answer: 2, explain: "ask sb to do sth。", tag: "不定式" },
  { q: "Mr. Watanabe rarely ______ meetings on time.", choices: ["attend", "attends", "attending", "to attend"], answer: 1, explain: "主语三单 + 一般现在时 → attends。", tag: "主谓一致" },
  { q: "The goods were damaged ______ transit.", choices: ["on", "at", "in", "by"], answer: 2, explain: "in transit（运输途中）固定短语。", tag: "介词搭配" },
  { q: "We look forward to ______ from you soon.", choices: ["hear", "hearing", "be heard", "have heard"], answer: 1, explain: "look forward to 中 to 是介词 → + doing。超高频考点！", tag: "动名词" },
  { q: "The number of applicants ______ increased this year.", choices: ["have", "has", "are", "were"], answer: 1, explain: "the number of + 复数名词作主语时谓语用单数。", tag: "主谓一致" },
  { q: "The instructions ______ on the first page are easy to follow.", choices: ["listing", "listed", "list", "to listing"], answer: 1, explain: "过去分词后置定语：instructions (that are) listed。", tag: "分词" },
  { q: "The shipment should have arrived ______ now.", choices: ["by", "until", "at", "for"], answer: 0, explain: "by now（到此刻为止）固定表达。", tag: "介词" },
  { q: "The new policy applies ______ all part-time employees.", choices: ["for", "to", "with", "on"], answer: 1, explain: "apply to sb（适用于）固定搭配。", tag: "介词搭配" },
  { q: "Hardly ______ the office when the client called again.", choices: ["she left", "did she leave", "she had left", "does she leave"], answer: 1, explain: "hardly... when 结构 + 否定副词开头用倒装 did she leave。", tag: "倒装" },
  { q: "The brochure is available ______ English and Japanese.", choices: ["both in", "in both", "both of", "of both"], answer: 1, explain: "in both English and Japanese（可用两种语言）。", tag: "介词" },
  { q: "We are considering ______ the launch date by a week.", choices: ["postpone", "to postpone", "postponing", "postponed"], answer: 2, explain: "consider + doing（考虑做某事），不接不定式。", tag: "动名词" }
];

/* ============ 阅读 Part 6 长文填空（每篇 4 空） ============ */
const P6_DATA = [
  {
    title: "MEMO · 销售培训",
    type: "MEMO",
    lines: [
      "MEMO",
      "To: All Sales Staff    From: Training Department",
      "Subject: Updated Sales Training Program",
      "",
      "The Training Department ______(1) that a revised sales training program will begin next month. The program ______(2) new techniques for customer presentations. All sales staff ______(3) to attend the two-day workshop, which will be held at the head office. Since seats are limited, please register ______(4) April 10."
    ],
    blanks: [
      { choices: ["announces", "announcing", "to announce", "announced"], answer: 0, explain: "主语 The Department + 缺谓语 → 第三人称单数 announces。" },
      { choices: ["include", "includes", "including", "inclusive"], answer: 1, explain: "program 单数 → includes；including 是介词用法。" },
      { choices: ["require", "requiring", "are required", "requirement"], answer: 2, explain: "staff 是被要求 → are required to do。" },
      { choices: ["by", "until", "since", "during"], answer: 0, explain: "截止日期用 by。" }
    ]
  },
  {
    title: "E-MAIL · 订单发货",
    type: "E-MAIL",
    lines: [
      "Dear Ms. Novak,",
      "Thank you for your order. We are pleased to inform you that the office chairs you ______(1) on May 2 have been shipped. Your order should ______(2) within three business days. If any item arrives damaged, please contact us ______(3) so that we can arrange a replacement. A copy of the delivery notice is ______(4) to this e-mail.",
      "",
      "Sincerely, Customer Support Team"
    ],
    blanks: [
      { choices: ["place", "placed", "placing", "placement"], answer: 1, explain: "you placed on May 2：省略 that 的定语从句，过去时。" },
      { choices: ["arrive", "arrives", "arriving", "arrived"], answer: 0, explain: "should + 动词原形。" },
      { choices: ["prompt", "promptly", "promptness", "prompting"], answer: 1, explain: "修饰动词 contact 用副词 promptly。" },
      { choices: ["attach", "attaching", "attached", "attachment"], answer: 2, explain: "is attached to 被动：被附上。" }
    ]
  },
  {
    title: "NOTICE · 停车场关闭",
    type: "NOTICE",
    lines: [
      "NOTICE — Parking Lot Closure",
      "",
      "The underground parking lot will be closed ______(1) Monday, June 9, for resurfacing work. During the closure, employees are ______(2) to use the public lot on Elm Street. A free shuttle bus will run between the two lots every fifteen minutes ______(3) 7 a.m. and 9 a.m. We ______(4) for any inconvenience this may cause."
    ],
    blanks: [
      { choices: ["at", "on", "in", "by"], answer: 1, explain: "具体到某一天用 on Monday。" },
      { choices: ["encourage", "encouraging", "encouraged", "encouragement"], answer: 2, explain: "are encouraged to do 被鼓励做。" },
      { choices: ["among", "between", "during", "along"], answer: 1, explain: "between A and B 固定结构。" },
      { choices: ["apologize", "apology", "apologetic", "apologetically"], answer: 0, explain: "缺谓语动词 → We apologize for。" }
    ]
  },
  {
    title: "LETTER · 会员续期",
    type: "LETTER",
    lines: [
      "Dear Mr. Wu,",
      "Your membership with the city business association will ______(1) at the end of this month. We hope you will renew for another year and continue to enjoy our networking events and training seminars. Members who renew ______(2) June 30 will receive a 10 percent discount on the annual fee. To renew, simply complete the enclosed form and return it in the ______(3) envelope. If you have any questions, please do not ______(4) to contact our office.",
      "",
      "Sincerely, Membership Services"
    ],
    blanks: [
      { choices: ["expire", "expiring", "expired", "expiration"], answer: 0, explain: "will + 动词原形。" },
      { choices: ["before", "after", "while", "until"], answer: 0, explain: "6 月 30 日「之前」续费享受折扣 → before。" },
      { choices: ["provide", "provided", "providing", "provision"], answer: 1, explain: "过去分词作前置定语：随函附上的信封 = the enclosed/provided envelope。" },
      { choices: ["hesitate", "hesitant", "hesitation", "hesitantly"], answer: 0, explain: "do not hesitate to contact 固定表达。" }
    ]
  },
  {
    title: "E-MAIL · 会议改期通知",
    type: "E-MAIL",
    lines: [
      "Dear Ms. Brown,",
      "Due to a scheduling conflict, the product review meeting originally planned for Monday, July 6 has been ______(1) to Friday, July 10, at 2 p.m. The meeting will now take place in conference room 3B instead of the executive boardroom. Please ______(2) the updated presentation slides, which are attached, before the meeting. If the new time is not ______(3) for you, contact my assistant by Wednesday so that alternative arrangements can be made. We appreciate your ______(4).",
      "",
      "Sincerely, David Kim, Project Coordinator"
    ],
    blanks: [
      { choices: ["postponed", "posted", "posed", "positioned"], answer: 0, explain: "会议被推迟 → has been postponed。" },
      { choices: ["review", "reviewing", "reviewed", "reviewer"], answer: 0, explain: "Please + 动词原形（祈使）。" },
      { choices: ["convenient", "convenience", "conveniently", "convene"], answer: 0, explain: "is not convenient for you → 需要形容词。" },
      { choices: ["understand", "understanding", "understandingly", "understandable"], answer: 1, explain: "your + 名词 → understanding（体谅）。" }
    ]
  },
  {
    title: "NOTICE · 健身房设备维护",
    type: "NOTICE",
    lines: [
      "NOTICE — Fitness Center Equipment Maintenance",
      "",
      "The treadmills in the east section will be ______(1) for maintenance from March 10 to March 12. During this period, members are encouraged to use the eight treadmills in the west section, ______(2) will remain open as usual. Locker rooms will close at 9 p.m., thirty minutes earlier than ______(3). Personal training ______(4) are not affected by this schedule. We thank you for your patience."
    ],
    blanks: [
      { choices: ["available", "unavailable", "availability", "availably"], answer: 1, explain: "维护期间不可用 → unavailable。" },
      { choices: ["what", "which", "where", "who"], answer: 1, explain: "非限定定语从句（有逗号）指物 → which。" },
      { choices: ["usual", "usually", "usualness", "unusually"], answer: 0, explain: "earlier than usual（比平时早）固定短语。" },
      { choices: ["session", "sessions", "session's", "sessional"], answer: 1, explain: "are 提示复数可数名词 → sessions。" }
    ]
  },
  {
    title: "E-MAIL · 账单金额疑问",
    type: "E-MAIL",
    lines: [
      "Dear Mr. Ling,",
      "We are writing about invoice No. 4471, ______(1) on June 2. Our records show a total of 180,000 yen, but the amount due on your invoice is 195,000 yen. Could you please ______(2) the difference? We believe the shipping fee may ______(3) been charged twice. We would appreciate a corrected invoice ______(4) the end of the month so that we can process the payment promptly.",
      "",
      "Sincerely, Accounts Payable, Maruso Trading"
    ],
    blanks: [
      { choices: ["issued", "issuing", "issue", "to issue"], answer: 0, explain: "invoice (which was) issued on June 2，过去分词后置定语。" },
      { choices: ["explain", "explaining", "explanation", "explanatory"], answer: 0, explain: "Could you please + 动词原形。" },
      { choices: ["has", "have", "had", "having"], answer: 1, explain: "may have been charged（可能被收了两次），情态动词后用原形 have。" },
      { choices: ["by", "until", "since", "during"], answer: 0, explain: "by the end of the month（不晚于月底）。" }
    ]
  },
  {
    title: "LETTER · 展会感谢信",
    type: "LETTER",
    lines: [
      "Dear Ms. Farid,",
      "Thank you for attending the regional trade fair last week. We hope you had the ______(1) to speak with our product specialists at booth 12. To help us improve future events, we would be grateful ______(2) you could complete the short survey ______(3) at the link below; it takes fewer than five minutes. As a token of our appreciation, all respondents will receive a 15 percent discount code ______(4) online orders placed before September 30.",
      "",
      "Sincerely, Event Team, Northbridge Trade Association"
    ],
    blanks: [
      { choices: ["opportunely", "opportune", "opportunity", "opportunities"], answer: 2, explain: "the + 名词 → opportunity（机会）。" },
      { choices: ["if", "unless", "despite", "while"], answer: 0, explain: "we would be grateful if you could... 固定礼貌句型。" },
      { choices: ["available", "availability", "availably", "avail"], answer: 0, explain: "survey (which is) available at the link → 形容词作后置定语。" },
      { choices: ["for", "to", "with", "at"], answer: 0, explain: "discount code for online orders（用于网购的折扣码）。" }
    ]
  }
];

/* ============ 阅读 Part 7 阅读（单篇 + 双篇） ============ */
const P7_DATA = [
  {
    title: "E-MAIL · 会议改期", type: "E-MAIL", double: false,
    passages: [
      "From: Angela Reyes\nTo: All project members\nSubject: Meeting moved to Thursday\n\nDear team,\n\nBecause Mr. Lin is returning from his business trip a day later than planned, our project meeting has been moved from Wednesday to Thursday at 10 a.m. The location is unchanged: conference room 4A. Please review the revised agenda, which is attached to this e-mail, before we meet. If you cannot attend, let me know by Tuesday noon so that I can arrange for someone to take notes on your behalf.\n\nBest regards,\nAngela"
    ],
    questions: [
      { q: "Why was the meeting rescheduled?", choices: ["The room was unavailable", "Mr. Lin's trip was extended", "The agenda was not ready"], answer: 1, explain: "returning a day later than planned。" },
      { q: "What is attached to the e-mail?", choices: ["The revised agenda", "A travel itinerary", "Meeting minutes"], answer: 0, explain: "the revised agenda is attached。" },
      { q: "What should members who cannot attend do?", choices: ["Review the minutes", "Reply by Tuesday noon", "Book conference room 4A"], answer: 1, explain: "let me know by Tuesday noon。" }
    ]
  },
  {
    title: "NOTICE · 图书馆假日时间", type: "NOTICE", double: false,
    passages: [
      "City Central Library — Holiday Hours\n\nThe library will operate on reduced hours during the Golden Week holidays, from April 29 to May 5. Opening hours will be 10 a.m. to 5 p.m., and the reading rooms will close thirty minutes before the building does. The children's story hour, normally held on Wednesdays, has been canceled during this period and will resume on May 7. Online reservations for study rooms remain available around the clock. Visitors returning borrowed items during the holidays may use the book drop next to the main entrance, which is open at all times."
    ],
    questions: [
      { q: "What time will the reading rooms close during the holidays?", choices: ["4:30 p.m.", "5:00 p.m.", "5:30 p.m."], answer: 0, explain: "5 p.m. 前三十分钟 = 4:30。数字陷阱题。" },
      { q: "What will happen on May 7?", choices: ["The library reopens", "The story hour resumes", "Holiday hours end"], answer: 1, explain: "will resume on May 7 指的是 story hour。" },
      { q: "Where can visitors return books at any time?", choices: ["At the service desk", "In the book drop", "In the study rooms"], answer: 1, explain: "the book drop... open at all times。" }
    ]
  },
  {
    title: "ARTICLE · 新店开业", type: "ARTICLE", double: false,
    passages: [
      "Retail News — Bright Home Opens Fifth Store\n\nBright Home, a furniture retailer known for eco-friendly products, opened its fifth store in the Harumi district last Saturday. The new branch spans three floors and, unlike the company's other locations, includes a cafe that uses organic ingredients. To mark the opening, the first 200 customers received reusable shopping bags, and all items made from recycled materials were offered at a 15 percent discount over the weekend. Company president Aiko Mori said the firm plans to open two more stores next year if the Harumi branch meets its sales target within the first six months."
    ],
    questions: [
      { q: "What is special about the new store?", choices: ["It is the largest branch", "It has a cafe", "It sells only used furniture"], answer: 1, explain: "unlike the other locations, includes a cafe。" },
      { q: "What discount was offered over the weekend?", choices: ["15 percent off recycled-material items", "50 percent off all products", "Free bags with every purchase"], answer: 0, explain: "items made from recycled materials were offered at a 15 percent discount。" },
      { q: "What condition affects the plan for two more stores?", choices: ["Hiring more staff", "Meeting a sales target", "Finding suitable locations"], answer: 1, explain: "if the branch meets its sales target。" }
    ]
  },
  {
    title: "MEMO · 邮件服务器维护", type: "MEMO", double: false,
    passages: [
      "MEMO\nTo: All employees\nFrom: IT Department\nSubject: E-mail server maintenance\n\nThe e-mail server will be unavailable this Saturday from 9 p.m. until approximately 2 a.m. on Sunday while scheduled maintenance is performed. During this time, employees will not be able to send or receive e-mails, and the address book will not load. No action is required on your part; all messages sent to you during the outage will be stored and delivered once the server is back online. Employees who experience problems after Sunday should contact the IT help desk at extension 2200."
    ],
    questions: [
      { q: "How long will the maintenance last?", choices: ["2 hours", "5 hours", "9 hours"], answer: 1, explain: "9 p.m. 到次日 2 a.m. 共 5 小时。计算题。" },
      { q: "What will happen to e-mails sent during the outage?", choices: ["They will be deleted", "They will be delivered later", "Senders will be notified"], answer: 1, explain: "stored and delivered once the server is back online。" },
      { q: "Who should employees call if problems continue after Sunday?", choices: ["Extension 2200", "The server room", "Their supervisor"], answer: 0, explain: "IT help desk at extension 2200。" }
    ]
  },
  {
    title: "LETTER · 纸品调价通知", type: "LETTER", double: false,
    passages: [
      "Dear customers,\n\nEffective October 1, we will adjust the prices of our office paper products due to rising material costs. Orders placed before September 30 will be billed at current prices, even if delivery occurs later. We have held prices unchanged for three years, and this modest adjustment allows us to maintain the quality you expect. A complete list of new prices is enclosed. We deeply appreciate your continued business and look forward to serving you for many years to come.\n\nSato Paper Co., Ltd."
    ],
    questions: [
      { q: "When do the new prices take effect?", choices: ["September 30", "October 1", "In three years"], answer: 1, explain: "Effective October 1。" },
      { q: "How are orders placed before September 30 billed?", choices: ["At the new prices", "At the current prices", "With a 15 percent discount"], answer: 1, explain: "billed at current prices, even if delivery occurs later。" },
      { q: "What is enclosed with the letter?", choices: ["A new catalog", "A price list", "An invoice"], answer: 1, explain: "a complete list of new prices is enclosed。" }
    ]
  },
  {
    title: "双篇 · 办公室搬迁", type: "E-MAIL + NOTICE", double: true,
    passages: [
      "[E-MAIL]\nFrom: Keiko Tanaka (Admin)\nTo: All staff\nSubject: Relocation of the sales department\n\nDear colleagues,\n\nThe sales department will move to the Riverside building on the weekend of September 12-13. Please pack your desk items by Friday, September 11, using the boxes provided. Desktop computers will be handled by the IT staff, so do not unplug them yourself. Elevator use will be reserved for movers that weekend. On Monday, September 14, come directly to the new office; your desk numbers will be posted near the entrance.\n\nKeiko",
      "[NOTICE]\nRiverside Building Notice\n\nWelcome to the Riverside Building. Parking is available on levels B1 and B2 for a monthly fee of 15,000 yen; apply at the management office on the first floor. Building access cards will be issued at the reception desk on your first day; the cards are required to enter after 7 p.m. The employee cafeteria is on the second floor and accepts cash only during its first month of operation."
    ],
    questions: [
      { q: "What are staff told to do with computers?", choices: ["Pack them in boxes", "Leave them to IT staff", "Unplug them on Friday"], answer: 1, explain: "computers will be handled by the IT staff。" },
      { q: "Where will staff find their desk numbers?", choices: ["In the e-mail", "Near the new office entrance", "At the management office"], answer: 1, explain: "posted near the entrance。" },
      { q: "What does the notice say about parking?", choices: ["It is free for new tenants", "It requires an application", "It is available on level 1"], answer: 1, explain: "apply at the management office。" },
      { q: "During the cafeteria's first month, what payment is accepted?", choices: ["Cash only", "Credit cards only", "Access cards"], answer: 0, explain: "accepts cash only during its first month。" }
    ]
  },
  {
    title: "双篇 · 商务论坛报名", type: "AD + E-MAIL", double: true,
    passages: [
      "[ADVERTISEMENT]\nThe Kanagawa Business Forum — October 8\n\nJoin over 500 professionals at the annual Kanagawa Business Forum, held this year at the Grand Minato Hotel. This year's theme is \"Growing in a Digital World.\" Early-bird registration is 8,000 yen until September 15; after that date, the fee rises to 10,000 yen. All attendees receive a seminar handbook, and the first 100 registrants are invited to a free networking dinner. Group discounts are available for parties of five or more.",
      "[E-MAIL]\nFrom: Hiro Yamada\nTo: Mika Sato\nSubject: Business forum\n\nHi Mika,\n\nFour of us from the marketing team are planning to attend the Business Forum on October 8. If we register together as a group, the fee is lower. Could you handle the registration? I would also like to attend the networking dinner if there are still places. Please register before the middle of September so we can pay the early-bird rate.\n\nHiro"
    ],
    questions: [
      { q: "What is the theme of this year's forum?", choices: ["Growing in a Digital World", "New marketing strategies", "Hotel management trends"], answer: 0, explain: "This year's theme is \"Growing in a Digital World.\"" },
      { q: "What does Hiro ask Mika to do?", choices: ["Reserve a hotel room", "Complete the group registration", "Prepare a seminar handbook"], answer: 1, explain: "Could you handle the registration?" },
      { q: "Why does Hiro want to register by mid-September?", choices: ["To get the early-bird fee", "To receive free parking", "To choose the seats"], answer: 0, explain: "so we can pay the early-bird rate（9 月 15 日前 8,000 日元）。" },
      { q: "What is mentioned about the networking dinner?", choices: ["It costs 2,000 yen", "It is limited to 100 registrants", "It is open to all attendees"], answer: 1, explain: "the first 100 registrants are invited → 名额 100 人，所以 Hiro 说 if there are still places。" }
    ]
  },
  {
    title: "E-MAIL · 会议餐点确认", type: "E-MAIL", double: false,
    passages: [
      "From: catering@grandplaza.co.jp\nTo: h.osebe@brighttech.co.jp\nSubject: Your catering order — confirmed\n\nDear Mr. Osebe,\n\nThank you for choosing Grand Plaza Catering. We are writing to confirm your order for the sales workshop on Thursday, September 18. We will deliver 30 boxed lunches to the reception desk of your office by 11:30 a.m. The order includes 8 vegetarian meals as requested. Payment will be charged to your company account after delivery; an itemized receipt will be e-mailed within two business days. If you need to change the number of lunches, please contact us by 5 p.m. on the day before delivery. Later changes cannot be guaranteed.\n\nGrand Plaza Catering"
    ],
    questions: [
      { q: "When will the lunches be delivered?", choices: ["By 11:30 a.m. on Thursday", "At 5 p.m. on September 18", "Two business days after payment"], answer: 0, explain: "deliver... by 11:30 a.m. on Thursday, September 18。" },
      { q: "What special request did the customer make?", choices: ["Early delivery", "Vegetarian meals", "Payment by credit card"], answer: 1, explain: "includes 8 vegetarian meals as requested。" },
      { q: "What happens if changes are made after 5 p.m. the day before?", choices: ["A fee is charged", "They cannot be guaranteed", "The order is canceled"], answer: 1, explain: "Later changes cannot be guaranteed。" }
    ]
  },
  {
    title: "NOTICE · 免费投资讲座", type: "NOTICE", double: false,
    passages: [
      "Riverside Community Center\nFree Lecture: Introduction to Personal Investing\nDate: Saturday, October 4, 2:00-3:30 p.m.\nLocation: Main hall, second floor\nSpeaker: Yuki Hamasaki, financial advisor\n\nThe lecture will cover the basics of personal investing, including savings plans, retirement accounts, and risk management. No prior knowledge is required. Seats are limited to 80 people, and registration opens on our website at 9 a.m. on September 20. Each attendee will receive a free booklet, Planning Your Financial Future. Childcare is available for children aged 3-6; please request this when registering, as spaces are limited to 12 children."
    ],
    questions: [
      { q: "Who is the lecture intended for?", choices: ["Financial advisors", "Beginners", "Certified accountants"], answer: 1, explain: "No prior knowledge is required → 面向初学者。" },
      { q: "What will each attendee receive?", choices: ["A discount code", "A free booklet", "A savings plan"], answer: 1, explain: "a free booklet, Planning Your Financial Future。" },
      { q: "What is stated about childcare?", choices: ["It is available for 12 children", "It costs extra", "It lasts all afternoon"], answer: 0, explain: "spaces are limited to 12 children。" }
    ]
  },
  {
    title: "ARTICLE · 老牌书店翻新重开", type: "ARTICLE", double: false,
    passages: [
      "City News — Hoshino Books Reopens After Renovation\n\nHoshino Books, a family-run bookstore in the Kanayama district, reopened last weekend after a three-month renovation. The store, founded in 1978, nearly closed last year when the owner considered retiring, but his daughter persuaded the family to modernize instead. The renovated shop now includes a small cafe, more seating, and a section dedicated to e-books and audiobooks, which customers can order in the store for home delivery. To celebrate the reopening, the first 50 visitors on each day of the opening weekend received a canvas tote bag. The store's operating hours have also been extended: it now opens at 9 a.m., one hour earlier than before, and closes at 8 p.m."
    ],
    questions: [
      { q: "Why did the store almost close?", choices: ["The building was sold", "The owner considered retiring", "Sales kept falling"], answer: 1, explain: "nearly closed last year when the owner considered retiring。" },
      { q: "What is new in the renovated store?", choices: ["A cafe", "A used-book section", "A printing service"], answer: 0, explain: "now includes a small cafe, more seating..." },
      { q: "What change was made to operating hours?", choices: ["The closing time is later", "The opening time is earlier", "Sunday hours were added"], answer: 1, explain: "opens at 9 a.m., one hour earlier than before。" }
    ]
  },
  {
    title: "双篇 · 班车时间变更", type: "NOTICE + E-MAIL", double: true,
    passages: [
      "[NOTICE]\nEmployee Shuttle Bus — Schedule Change\n\nFrom October 1, the evening shuttle bus departing from the head office will leave at 6:45 p.m. instead of 6:30 p.m. The change allows the bus to connect with the new express train from Central Station, which arrives at 6:40 p.m. Morning schedules are unchanged. Employees who use the last shuttle should note that no late bus is provided, so those working past 6:45 p.m. should use their usual transportation and submit a travel expense claim. The updated timetable is posted on the intranet and at the security desk.",
      "[E-MAIL]\nFrom: T. Maeda\nTo: Admin office\nSubject: Shuttle bus question\n\nHello,\n\nI usually take the 6:30 shuttle home, but I saw a notice about a schedule change starting next month. Could you confirm the new departure time? Also, I occasionally attend evening meetings that run past seven. Is there any way to get home by company transport after the last shuttle, or should I claim a taxi fare? I would appreciate an answer before the change takes effect.\n\nBest regards,\nT. Maeda"
    ],
    questions: [
      { q: "Why is the evening shuttle time changing?", choices: ["To connect with a new train", "Because the old bus was retired", "To match the morning schedule"], answer: 0, explain: "allows the bus to connect with the new express train。" },
      { q: "What does Mr. Maeda ask the admin office to confirm?", choices: ["The new departure time", "The morning schedule", "The taxi fare rate"], answer: 0, explain: "Could you confirm the new departure time?" },
      { q: "What are employees who work past 6:45 p.m. told to do?", choices: ["Take the next shuttle", "Claim travel expenses", "Work from home"], answer: 1, explain: "submit a travel expense claim。" },
      { q: "According to the notice, where can employees find the updated timetable?", choices: ["On the intranet", "In the e-mail", "At Central Station"], answer: 0, explain: "posted on the intranet and at the security desk。" }
    ]
  }
];

/* ============ Part 5 语法考点速查 ============ */
const GRAMMAR_CHEATSHEET = [
  { point: "① 词性判断", signal: "空格前是 a/an/the/形容词 → 填名词；空格在动词后 → 副词或名词；修饰名词 → 形容词；修饰动词/形容词/整句 → 副词", demo: "The report was ___ organized. → skillfully（修饰动词）" },
  { point: "② 主谓一致", signal: "主语后缺谓语：看单复数和时态；the number of + 单数；a number of + 复数", demo: "The number of visitors has doubled." },
  { point: "③ 时态", signal: "since/for/so far/recently → 完成时；yesterday/last week/in 2020 → 过去时；usually/every day → 一般现在", demo: "She has worked here since 2020." },
  { point: "④ 语态（被动）", signal: "主语是动作承受者，常伴 by/already/every month", demo: "Invoices are sent out monthly." },
  { point: "⑤ 不定式 vs 动名词", signal: "want/decide/plan/ask sb + to do；enjoy/suggest/consider/avoid/finish/mind + doing；look forward to + doing", demo: "We are considering postponing the launch." },
  { point: "⑥ 介词固定搭配", signal: "背熟高频搭配：in charge of / comply with / be familiar with / prior to / on behalf of / in transit / be subject to / apply to / compatible with", demo: "The policy applies to all staff." },
  { point: "⑦ 比较级与最高级", signal: "than → 比较级；of all/in the group → 最高级；多音节词 more/most；修饰比较级用 even/much/far", demo: "The fee is higher than expected." },
  { point: "⑧ 关系词", signal: "人 → who/whom；物 → which；地点 → where；时间 → when；逗号后（非限定）不能用 that", demo: "The hotel where we stayed has great reviews." },
  { point: "⑨ 连词", signal: "看逻辑：因果 because + 句 / because of + 名词；转折 although + 句 / despite + 名词；条件 if / unless（=如果不）", demo: "Despite the rain, the event was held." },
  { point: "⑩ 代词", signal: "it/they 指物；反身代词：enjoy oneself / by oneself / help yourself", demo: "The staff enjoyed themselves at the picnic." },
  { point: "⑪ 倒装", signal: "No sooner... than / Hardly... when + 倒装；否定副词开头（Never/Rarely/Seldom）主谓倒装", demo: "No sooner had the meeting started than the power went out." },
  { point: "⑫ 祈使句", signal: "祈使句以动词原形开头：Please review... / Contact us if...", demo: "Please ensure that all doors are locked." }
];

/* ============ 考试结构（2018 改革后现行题型） ============ */
const EXAM_STRUCTURE = {
  sections: [
    {
      name: "Listening 听力", time: "约 45 分钟", count: "100 题", score: "495 分",
      parts: [
        { p: "Part 1", n: "6 题", d: "照片描述：听 4 个句子，选出最符合照片的描述", tip: "有照片可先看；注意动词时态和能动态/被动态（is opening vs is open）" },
        { p: "Part 2", n: "25 题", d: "应答问题：听 1 个问题或陈述，从 3 个选项中选最佳应答", tip: "抓住疑问词（Where/Why/Who/How）；警惕发音相似的引诱项；陈述句用同意/建议回应" },
        { p: "Part 3", n: "39 题（13 组对话 × 3 题）", d: "对话理解：听 2-3 人的对话，每段答 3 题", tip: "利用读题时间先看题目和选项；答案按出题顺序出现；注意问题类型：主旨/细节/推断/接下来做什么" },
        { p: "Part 4", n: "30 题（10 篇独白 × 3 题）", d: "短文理解：广播、留言、演讲等独白，每篇答 3 题", tip: "开头 1-2 句锁定场景和说话人；数字、日期、价格随手记" }
      ]
    },
    {
      name: "Reading 阅读", time: "75 分钟", count: "100 题", score: "495 分",
      parts: [
        { p: "Part 5", n: "30 题", d: "短文填空：单句语法/词汇选择题", tip: "每题 20-30 秒；先判断空格词性；高频考点：动词时态语态、词性、介词搭配、比较级" },
        { p: "Part 6", n: "16 题（4 篇 × 4 空）", d: "长文填空：邮件/通知等文书中 4 处填空", tip: "结合上下文语境 + 词性双重判断；30-40 秒/空" },
        { p: "Part 7", n: "54 题（单篇 29 + 双篇 25）", d: "阅读理解：邮件、通知、广告、文章、双篇对比", tip: "时间管理是命门：给 Part 7 留足 50 分钟；先读题目再回原文定位；双篇题注意两文的共同点和差异" }
      ]
    }
  ],
  scoring: [
    { band: "905-990", level: "国际商务顶级水平", note: "全球任何职场无障碍；名企海外岗位加分项" },
    { band: "785-900", level: "高级商务水平", note: "日本大手企业晋升・海外赴任的常见门槛" },
    { band: "605-780", level: "中级商务水平", note: "能处理日常业务邮件和会议；日企普遍要求 600+" },
    { band: "405-600", level: "初级商务水平", note: "能应对基本办公沟通" },
    { band: "10-400", level: "基础水平", note: "建议先补基础词汇和语法" }
  ]
};

/* ============ 各 Part 高分策略 ============ */
const STRATEGIES = [
  {
    part: "听力通用", icon: "🎧", points: [
      "利用 Directions 和翻页间隙提前读题——正式考试里这是最大的时间红利",
      "听不懂整句时抓住名词和动词：TOEIC 听力 80% 的答案围绕「谁做什么、时间、地点、原因」",
      "遇到发音引诱项（题目里出现 station，选项说 statue）立即排除——相似发音必是陷阱",
      "全卷不倒扣分：绝对不留空，最后 10 秒也要全部涂卡"
    ]
  },
  {
    part: "Part 1-2 快攻", icon: "📸", points: [
      "Part 1：照片出现后先自己心里说一句话（谁在做什么），再对照选项",
      "Part 1 高频结构：is + V-ing / is being + 过去分词 / has been + 过去分词",
      "Part 2：疑问词决定答案方向——Where→地点、Why→原因、When→时间、How→方式、Who→人",
      "Part 2 陈述句（Let's... / I'd like to...）用「回应语气」作答：同意、建议、感谢",
      "Yes/No 问题正确答案经常不带 Yes/No，而是直接给出信息"
    ]
  },
  {
    part: "Part 3-4 提速", icon: "🗣️", points: [
      "拿到题先读「问题句」，带着问题听——选项只需要扫一眼关键词",
      "对话和独白都按题目顺序推进：第 1 题的答案一定在第 2 题答案之前出现",
      "Part 3 注意问题类型：What is the problem? / Why...? / What will the man do next?（下一步动作常在对话结尾）",
      "Part 4 开头句是钥匙：Announcement / Voice message / Tour guide 决定场景，场景决定词汇",
      "数字题（价格、时间、时长）随手在草稿上记，最后统一核对"
    ]
  },
  {
    part: "Part 5-6 语法", icon: "📝", points: [
      "先看空格前后的词判断词性：冠词/形容词后→名词；动词后→副词或名词；主语后缺→谓语动词",
      "五大高频语法：①动词时态与主谓一致 ②词性判断 ③介词与固定搭配 ④比较级 ⑤关系词与从句",
      "固定搭配优先：in charge of / be familiar with / comply with / prior to / on behalf of",
      "Part 6 先通读判断文体（邮件/通知），空格处兼顾「语法对 + 语义通」",
      "一题超过 40 秒立即选一个顺眼的标记跳过——后面 Part 7 的时间更值钱"
    ]
  },
  {
    part: "Part 7 阅读", icon: "📖", points: [
      "时间分配参考：Part 5 用 10 分钟、Part 6 用 10 分钟、Part 7 保留 50-55 分钟",
      "先读题干（不读选项）→ 带着关键词回原文定位 → 对比选项，避免通读全文",
      "文章顺序 = 题目顺序：Not/EXCEPT 题除外，它们需要逐项回原文核对",
      "双篇题常考「两篇的关系」：一封邮件+一篇通知、一篇广告+一封咨询邮件，重点找共同信息和矛盾点",
      "「接下来大概率会做什么」类推断题：答案常在文末的动作请求或时间安排里"
    ]
  },
  {
    part: "考前冲刺", icon: "🚀", points: [
      "考前两周：每 2-3 天一套完整官方题，严格计时，训练 2 小时专注力",
      "错题本比刷新题重要：每道错题弄清「错在词汇、语法还是时间不够」",
      "考前 3 天只复习：错题本 + 高频词 + 各 Part 的解题流程，不做新难题",
      "考试当天：提前踩点；听力播放前深呼吸；涂卡节奏保持稳定（10 题一涂）"
    ]
  }
];

/* ============ 30 天冲刺计划 ============ */
const STUDY_PLAN = [
  { week: "第 1 周 · 打基础", days: "Day 1-7", tasks: [
    "Day 1: 用软件「模拟考试-快速版」摸底，记录各 Part 正确率",
    "每天背 25 个高频词（词汇页·闪卡模式），次日先复习昨日词汇",
    "Part 5 每天 10 题（软件阅读页），按 tag 整理语法弱点",
    "每天泛听 15 分钟：官方 App English Upgrader+ 或 BBC 6 Minute English"
  ]},
  { week: "第 2 周 · 听力攻坚", days: "Day 8-14", tasks: [
    "Part 1+2 每天 15 题（软件听力页，0.9 倍速起步）",
    "Part 3 每天一组（3 题），做完必看原文跟读一遍",
    "每天背 25 个新词 + 复习（SRS 会自动安排到期词汇）",
    "Day 14: 重做第一周的错题本"
  ]},
  { week: "第 3 周 · 阅读提速", days: "Day 15-21", tasks: [
    "Part 5 每天 15 题限时（20 秒/题）",
    "Part 6 每天一篇 + Part 7 每天一篇，先读题再回原文定位",
    "听力保持：Part 4 每天两篇（1.0 倍速）",
    "每天背 25 个新词 + 复习"
  ]},
  { week: "第 4 周 · 全真冲刺", days: "Day 22-30", tasks: [
    "Day 22 & 26 & 29: 各做一套快速模拟（软件模考页），严格计时",
    "每套模考后：错题全部进错题本，分析错因（词汇/语法/速度）",
    "官方公式問題集做 1-2 套完整纸质版，训练涂卡节奏",
    "Day 30: 只看错题本和策略页，早睡；考前不做新题"
  ]}
];

/* ============ 精选备考资源（日本方向） ============ */
const RESOURCES = [
  {
    cat: "官方网站（日本）", icon: "🏛️", items: [
      { name: "IIBC TOEIC 官网（日本官方）", desc: "报名・考试日程・受験料・官方数据，日本考生的一切从这里开始", url: "https://www.iibc-global.org/toeic/" },
      { name: "公式教材一覧", desc: "公式問題集・公式ガイド等官方教材列表（最新卷最接近当前出题倾向）", url: "https://www.iibc-global.org/toeic/lr/study/textbook.html" },
      { name: "TOEIC 公式アプリ & English Upgrader+", desc: "官方免费 App 和英文学习专栏，听力素材质量极高", url: "https://www.iibc-global.org/toeic/lr/study/app.html" }
    ]
  },
  {
    cat: "日本主流教材・App", icon: "📚", items: [
      { name: "『公式TOEIC Listening & Reading 問題集』", desc: "ETS 授权真题集，备考必备；建议从最新卷开始做", url: "https://www.iibc-global.org/toeic/lr/study/textbook.html" },
      { name: "『金のフレーズ』（TEX 加藤）", desc: "托业单词书销量王者，按分数段（600→730→860→990）编排，配合 abceed 电子版刷更高效", url: "https://www.amazon.co.jp/s?k=TOEIC+L%26R+%E9%87%91%E3%81%AE%E3%83%95%E3%83%AC%E3%83%BC%E3%82%BA" },
      { name: "『TOEIC L&R テスト 文法問題でる1000問』", desc: "Part 5 语法刷题神器，1000 题按语法点分类", url: "https://www.amazon.co.jp/s?k=TOEIC+%E6%96%87%E6%B3%95%E5%95%8F%E9%A1%8C%E3%81%A7%E3%82%8B1000%E5%95%8F" },
      { name: "abceed（AI TOEIC 対策）", desc: "日本最流行的 TOEIC AI 刷题 App，自动分析弱点，免费版够用", url: "https://abceed.com/" },
      { name: "Santa アルク", desc: "词汇诊断 App：10 分钟测出词汇量水平和预计分数", url: "https://www.alc.co.jp/santa/" },
      { name: "スタディサプリENGLISH TOEIC対策", desc: "视频讲解 + 刷题，适合需要系统讲课感的考生（付费）", url: "https://eikaiwa.studysapuri.jp/" }
    ]
  },
  {
    cat: "视频 & 中文资源", icon: "🎬", items: [
      { name: "知乎：托业备考资料推荐与经验分享", desc: "中文考生的完整备考路径和资料清单", url: "https://zhuanlan.zhihu.com/p/446419873" },
      { name: "知乎：21 天达成托业 900+ 经验帖", desc: "高分刷题方法论，含各题型技巧", url: "https://zhuanlan.zhihu.com/p/68061632" },
      { name: "B 站：新托业考试精讲（目标 800 分）", desc: "中文系统讲解课程，适合入门建立框架", url: "https://www.bilibili.com/video/BV1Sa8oeVEYp/" },
      { name: "ETS 官方（全球）", desc: "出题方 ETS 官网，了解评分原理和官方样题", url: "https://www.ets.org/toeic.html" }
    ]
  }
];

/* ============ 日本报名信息 ============ */
const JAPAN_INFO = [
  { k: "主办方", v: "IIBC（国際ビジネスコミュニケーション協会），ETS 授权的日本唯一官方运营机构" },
  { k: "考试类型", v: "公開テスト（个人报名，全年约 10 次，多在周日，上/下午两场）与 IP テスト（公司/学校团体）" },
  { k: "受験料", v: "公开考试 L&R 约 7,810 日元（含税；最新价格以官网为准）" },
  { k: "报名方式", v: "官网注册 My Account → 选择考试日期和会场 → 信用卡/便利店缴费 → 打印受験票" },
  { k: "成绩发布", v: "网上约 17 天后可查分，正式证书（Official Score Certificate）随后邮寄" },
  { k: "考试当天", v: "需携带受験票 + 带照片证件；只能用铅笔/自动铅笔涂卡；开考前手机必须关机存放" }
];
