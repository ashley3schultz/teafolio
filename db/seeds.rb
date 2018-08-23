users = [
    {email: "user1@email.com", username: "user1", password: "password1", admin: false},
    {email: "user2@email.com", username: "user2", password: "password2", admin: false},
    {email: "user3@email.com", username: "user3", password: "password3", admin: false},
    {email: "user4@email.com", username: "user4", password: "password4", admin: false},
    {email: "user5@email.com", username: "user5", password: "password5", admin: false},
    {email: "user6@email.com", username: "user6", password: "password6", admin: false},
    {email: "user7@email.com", username: "user7", password: "password7", admin: false},
    {email: "user8@email.com", username: "user8", password: "password8", admin: false},
    {email: "user9@email.com", username: "user9", password: "password9", admin: false},
    {email: "admin@email.com", username: "admin", password: "password", admin: true}]

pending_teas = [
    {name: "Amaranth Star", oxidation: "White", description: "White tea star combined with a single red Amaranth.", user_id: 7},
    {name: "Dragon Pearl Jasmine", aka: "Mo Li Long Zhu", oxidation: "Green", description: "Hand rolled five times infused jasmine Green tea.", user_id: 8},
    {name: "Iron Goddess", aka: "Tie Guan Yin", oxidation: "Oolong", description: "Dark, 25 year aged Tie Guan Yin made in 1992 and stored immaculately.", user_id: 9},
    {name: "Yunnan Black", aka: "Chen Hong Cha", oxidation: "Black", description: "Bright, brisk, black tea balanced by warming dry hay notes and a whisper of grape.", user_id: 7},
    {name: "Young Gushu", aka: "Bing Dao 600 Year Old Gushu Raw", oxidation: "Puerh", description: "Bright and gentle PuErh made from ancient tree leaves picked and blended from the East and West sides of Bingdao.", user_id: 8},
    {name: "Amber Mountain", aka: "Huo Shan Huang Ya", oxidation: "Yellow", description: "Smooth and elegant tea made in small batches.", user_id: 9}]

teas = [
    {name: "Blossoming Jewels", oxidation: "White", description: "Our selection of hand produced blossoming tea created by Chinese artisans."},
    {name: "Elder White", aka: "Ye Sheng Ya Bao", oxidation: "White", description: "The precious lateral buds of wild PuErh trees picked in late winter."},
    {name: "Silver Needle", aka: "Bai Hao Yin Zhen", oxidation: "White", description: "Very early spring picked silver beige buds producing a luscious, thick and soft liquor."},
    {name: "White Peony", aka: "Bai Mu Dan", oxidation: "White", description: "Fluffy blend of buds and leaves for a richer flavour."},
    {name: "Yabukita Sencha", oxidation: "Green", description: "Early spring picked Japanese steamed tea. Bright lime liquor which is thick and brothy."},
    {name: "Houjicha", oxidation: "Green", description: "Porcelain roasted blend of three pickings of Bancha Green tea."},
    {name: "Dragonwell", aka: "Long Jing", oxidation: "Green", description: "Pre Qing Ming harvest of one of China’s most famous teas."},
    {name: "Temple Blossom", aka: "Jingshan", oxidation: "Green", description: "Tang Dynasty temple tea closely associated with Buddhist monks which inspired Japanese tea culture."},
    {name: "Alishan Creaam", aka: "Alishan Jin Xuan", oxidation: "Oolong", description: "A rich and luxurious tea made from the naturally milky Jin Xuan cultivar."},
    {name: "Amber Gaba Oolong", oxidation: "Oolong", description: "Oolong processed in nitrogen to increase GABA to 200mg per 100g."},
    {name: "Lost Robe", aka: "Bei Dou Yi Hao", oxidation: "Oolong", description: "Cultivar developed from cuttings of the original Da Hong Pao mother plants."},
    {name: "Eastern Beauty", aka: "Bai Hao Wulong", oxidation: "Oolong", description: "Terpene rich leafhopper bitten Oolong."},
    {name: "Ruby Black", aka: "Sun Moon Lake", oxidation: "Black", description: "Captivating Black tea unlike any other tea available."},
    {name: "Gleaming Brow", aka: "Jin Jun Mei", oxidation: "Black", description: "Highest grade Wuyi tea picked only a few days per year."},
    {name: "Keemun", aka: "Qimen Hao Ya", oxidation: "Black", description: "Top shelf, hand-rolled Keemun Black. Malted milk, caramel, fermented apricots, cedar wood and rose."},
    {name: "Little Tong Mu", aka: "Tong Mu Zhengshan Xiaozhong", oxidation: "Black", description: "Unsmoked Lapsang from the famed Tong Mu village."},
    {name: "Purple Bud", aka: "Ye Sheng Zi Ya", oxidation: "Puerh", description: "Made from buds of the Purple trees in Yunnan."},
    {name: "King Plum", aka: "Yiwu 800 Year Old Gushu PuErh Raw", oxidation: "Puerh", description: "Over twelve year Kunming aged Gushu from the legendary Yiwu mountains."},
    {name: "Black Yunnan Tuo", aka: "Fengqing Shu Tuo", oxidation: "Puerh", description: "Ripe PuErh aged since 1998 in Yunnan."},
    {name: "Fire Phoenix", aka: "Shu PuErh", oxidation: "Puerh", description: "Ripe PuErh made from buds and baby leaves and aged since 2008."},
    {name: "Diamond Peak", aka: "Junshan Yinzhen", oxidation: "Yellow", description: "Fragrant Yellow tea which is highly prized in China."}]

    users.each do |user|
      u = User.new(user)
      u.save(validate: false)
    end

    pending_teas.each do |tea|
      t = PendingTea.new(tea)
      t.save(validate: false)
    end

    teas.each do |tea|
      t = Tea.new(tea)
      t.save(validate: false)
    end
