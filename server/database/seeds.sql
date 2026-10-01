-- =======================================================
-- Cravo Kitchen & Bar Seed Data (MySQL)
-- =======================================================

USE `cravo_db`;

-- 1. Default Administrator (password: admin123)
INSERT INTO `admins` (`id`, `username`, `email`, `password`)
VALUES (1, 'admin', 'admin@cravo.com', '$2a$10$5aHW6X8xXhuCe5IKDsU9/e5WzhdhBrwtTmLO87If47wI41/PsmzsW')
ON DUPLICATE KEY UPDATE `username` = VALUES(`username`);

-- 2. Food Products Matching Stitch AI Designs
INSERT INTO `products` (`id`, `name`, `description`, `price`, `category`, `image`, `available`) VALUES
(1, 'Cravo Black Truffle Double Smash Burger', 'Two smashed Angus beef patties, melted aged gouda & gruyere cheese, sautéed wild forest mushrooms, crispy frizzled shallots, and luscious black truffle aioli on toasted brioche.', 18.50, 'Burgers', '/images/truffle_burger_8.jpg', 1),
(2, 'Smoked Applewood Bacon BBQ Burger', 'Thick-cut crispy glazed applewood bacon, melted sharp Vermont cheddar cheese, sweet caramelized onion jam, and smoky chipotle BBQ glaze on artisan sesame seed bun.', 16.95, 'Burgers', '/images/juicy_gourmet_bacon_barbecue_burger_with_thic_15.jpg', 1),
(3, 'Artisanal Double Angus Cheeseburger', 'Double Angus beef patties, bubbling sharp cheddar, heirloom tomatoes, fresh butter leaf lettuce, house pickles, and secret signature Cravo sauce on golden brioche.', 15.50, 'Burgers', '/images/gourmet_double_smashed_beef_cheeseburger_with_7.jpg', 1),
(4, 'Wood-Fired Neapolitan Margherita Pizza', 'Leopard-spotted charred artisan crust, crushed San Marzano tomato sauce, fresh buffalo mozzarella pearls, sweet basil leaves, and cold-pressed olive oil drizzle.', 17.00, 'Pizza', '/images/margherita_pizza_16.jpg', 1),
(5, 'Hot Honey Artisan Pepperoni Pizza', 'Crispy cupping artisanal pepperoni, fresh torn whole milk mozzarella, spicy Mike\'s hot honey drizzle, organic oregano flakes, and wood-fired blistered crust.', 19.50, 'Pizza', '/images/pepperoni_pizza_17.jpg', 1),
(6, 'Nashville Hot Crispy Chicken Sandwich', 'Buttermilk-brined fried chicken breast dipped in fiery Nashville cayenne chili oil, topped with garlic crema slaw and thick crinkle-cut brine pickles on potato bun.', 15.25, 'Chicken', '/images/chicken_18.jpg', 1),
(7, 'Smoked Honey-Glazed BBQ Chicken Wings', '8 jumbo hickory-smoked wings tossed in sweet sticky wildflower honey BBQ sauce, garnished with toasted sesame seeds, scallions, and creamy blue cheese dip.', 14.00, 'Chicken', '/images/platter_of_8_sticky_sweet_honey_glazed_smoked_19.jpg', 1),
(8, 'Golden Nashville Hot Chicken Tenders', 'Crisp double-battered chicken tenderloins seasoned with Southern spices, served with tangy comeback dipping sauce and house garlic dill pickles.', 13.50, 'Chicken', '/images/golden_crisp_deep_fried_spicy_nashville_hot_c_10.jpg', 1),
(9, 'Parmesan & Herb White Truffle Fries', 'Hand-cut Belgian russet fries tossed with aromatic white truffle oil, freshly grated Parmigiano-Reggiano snow, and chopped flat-leaf Italian parsley.', 9.50, 'Snacks', '/images/truffle_fries_11.jpg', 1),
(10, 'Belgian Chocolate Molten Lava Cake', 'Warm decadent Belgian dark chocolate cake with a molten ganache center, served with a velvety scoop of Madagascar vanilla bean gelato and dusted with pure cocoa.', 11.00, 'Desserts', '/images/decadent_individual_warm_belgian_chocolate_mo_21.jpg', 1),
(11, 'Blood Orange Hazy IPA Craft Beer', 'Frosted tall glass of double dry-hopped hazy IPA with tropical citrus notes, thick frothy head, and fresh blood orange garnish (6.8% ABV).', 8.50, 'Drinks', '/images/beverage_27.jpg', 1),
(12, 'Wild Hibiscus & Citrus Iced Craft Tea', 'Cold-brewed wild organic hibiscus flowers, steeped with fresh citrus zest, pomegranate essence, and crushed mint over artisan crystal ice.', 5.75, 'Drinks', '/images/beverage_6.jpg', 1)
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`);

-- 3. Initial Sample Orders
INSERT INTO `orders` (`id`, `customer_name`, `customer_phone`, `customer_address`, `total_amount`, `status`) VALUES
(1001, 'David Miller', '(212) 555-8912', '742 Evergreen Terrace, Apt 4B', 46.50, 'Pending'),
(1002, 'Jessica Vance', '(212) 555-4301', '120 West 44th St, Suite 12', 32.25, 'Preparing'),
(1003, 'Marcus Sterling', '(212) 555-7788', '55 Hudson Yards, Fl 28', 50.50, 'Delivered')
ON DUPLICATE KEY UPDATE `customer_name` = VALUES(`customer_name`);

-- 4. Order Items
INSERT INTO `order_items` (`id`, `order_id`, `product_id`, `quantity`, `price`) VALUES
(1, 1001, 1, 2, 18.50),
(2, 1001, 9, 1, 9.50),
(3, 1002, 4, 1, 17.00),
(4, 1002, 6, 1, 15.25),
(5, 1003, 5, 2, 19.50),
(6, 1003, 10, 1, 11.00)
ON DUPLICATE KEY UPDATE `quantity` = VALUES(`quantity`);
