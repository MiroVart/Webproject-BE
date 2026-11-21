DROP DATABASE IF EXISTS wskrestaurant;
CREATE DATABASE wskrestaurant;
USE wskrestaurant;

CREATE TABLE `wsk_dishes` (
  `dish_id` int(11) NOT NULL,
  `dish_name_en` text NOT NULL,
  `dish_name_fi` text NOT NULL,
  `type` text NOT NULL,
  `weekday` text NOT NULL,
  `price` float NOT NULL,
  `calories` int(11) NOT NULL,
  `carbs` float NOT NULL,
  `fat` float NOT NULL,
  `saturated_fat` float NOT NULL,
  `protein` float NOT NULL,
  `fiber` float NOT NULL,
  `allergens_en` text DEFAULT '-',
  `allergens_fi` text DEFAULT '-',
  `description_en` text DEFAULT '-',
  `description_fi` text DEFAULT '-',
  `filename` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

INSERT INTO `wsk_dishes` (`dish_id`, `dish_name_en`, `dish_name_fi`, `type`, `weekday`, `price`, `calories`, `carbs`, `fat`, `saturated_fat`, `protein`, `fiber`, `allergens_en`, `allergens_fi`, `filename`) VALUES
(1, 'Meat soup', 'Lihakeitto', 'main', 'mon', 4.95, 370, 50, 20, 10, 20, 5, '-', '-', 'some_filename'),
(2, 'Fish soup', 'Kalakeitto', 'main', 'tue', 4.95, 330, 45, 10, 5, 20, 5, 'fish, milk', 'kala, maito', 'some_filename'),
(3, 'Deviled eggs', 'Täytetyt kananmunat', 'starter', 'mon', 2.95, 250, 45, 10, 5, 20, 2, 'eggs', 'kananmuna', 'some_filename'),
(4, 'Cheese souffle', 'Juustokohokas', 'starter', 'tue', 2.95, 350, 45, 10, 5, 20, 2, 'eggs, milk', 'kananmuna, maito', 'some_filename'),
(5, 'Candy milkshake', 'Karkkipirtelö', 'dessert', 'mon', 1.95, 200, 45, 10, 5, 20, 0, 'milk', 'maito', 'some_filename'),
(6, 'Protein fluff', 'Proteiinivaahto', 'dessert', 'tue', 1.95, 330, 45, 10, 5, 20, 0, 'milk', 'maito', 'some_filename');

CREATE TABLE `wsk_users` (
  `user_id` int(11) NOT NULL,
  `name` text NOT NULL,
  `username` text NOT NULL UNIQUE,
  `email` text NOT NULL,
  `password` text NOT NULL,
  `role` text NOT NULL DEFAULT 'user',
  `bonuscard_uses` INT(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

INSERT INTO `wsk_users` (`user_id`, `name`, `username`, `email`, `password`, `role`, `bonuscard_uses`) VALUES
(1, 'Administrator', 'admin', 'admin@metropolia.fi', '$2a$10$5RzpyimIeuzNqW7G8seBiOzBiWBvrSWroDomxMa0HzU6K2ddSgixS', 'admin', 0),
(2, 'unregistered', 'unregistered', 'unregistered@metropolia.fi', '$2a$10$5RzpyimIeuzNqW7G8seBiOzBiWBvrSWroDomxMa0HzU6K2ddSgixS', 'user', 0),
(3, 'Test User', 'john', 'john@metropolia.fi', '$2a$10$5RzpyimIeuzNqW7G8seBiOzBiWBvrSWroDomxMa0HzU6K2ddSgixS', 'user', 0);

CREATE TABLE `wsk_orders` (
  `order_id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `order_date` datetime DEFAULT NOW(),
  `dish_1` int(11) NOT NULL,
  `dish_1_amount` int(11) DEFAULT 1,
  `dish_2` int(11),
  `dish_2_amount` int(11) DEFAULT 0,
  `dish_3` int(11),
  `dish_3_amount` int(11) DEFAULT 0,
  `dish_4` int(11),
  `dish_4_amount` int(11) DEFAULT 0,
  `dish_5` int(11),
  `dish_5_amount` int(11) DEFAULT 0,
  `dish_6` int(11),
  `dish_6_amount` int(11) DEFAULT 0,
  `dish_7` int(11),
  `dish_7_amount` int(11) DEFAULT 0,
  `dish_8` int(11),
  `dish_8_amount` int(11) DEFAULT 0,
  `dish_9` int(11),
  `dish_9_amount` int(11) DEFAULT 0,
  `dish_10` int(11),
  `dish_10_amount` int(11) DEFAULT 0,
  `price` float NOT NULL DEFAULT 0,
  `finished` boolean DEFAULT false,
  `pickedup` boolean DEFAULT false
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

INSERT INTO `wsk_orders` (`order_id`, `customer_id`, `dish_1`, `dish_1_amount`, `price`, `finished`, `pickedup`) VALUES
(1, 1, 2, 10, 49.50, FALSE, FALSE),
(2, 2, 1, 2, 9.90, TRUE, FALSE),
(3, 3, 2, 10, 49.50, FALSE, FALSE);

ALTER TABLE `wsk_dishes`
  ADD PRIMARY KEY (`dish_id`);
  #ADD KEY `owner` (`owner`);

ALTER TABLE `wsk_users`
  ADD PRIMARY KEY (`user_id`);

ALTER TABLE `wsk_orders`
  ADD PRIMARY KEY (`order_id`);

ALTER TABLE `wsk_dishes`
  MODIFY `dish_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

ALTER TABLE `wsk_users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

ALTER TABLE `wsk_orders`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

ALTER TABLE `wsk_orders`
  ADD CONSTRAINT `fk_user_id_customer_id` FOREIGN KEY (`customer_id`) REFERENCES `wsk_users` (`user_id`);

DROP USER IF EXISTS 'restaurantuser'@'localhost';
CREATE USER 'restaurantuser'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON `wskrestaurant`.* TO 'restaurantuser'@'localhost';
FLUSH PRIVILEGES;
