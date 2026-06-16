CREATE TABLE IF NOT EXISTS products (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  brand VARCHAR(80) NOT NULL,
  category VARCHAR(80) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  old_price DECIMAL(10,2) NULL,
  stock INT UNSIGNED NOT NULL DEFAULT 0,
  badge VARCHAR(40) NULL,
  icon VARCHAR(80) NULL,
  description TEXT NULL,
  created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS clients (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  phone VARCHAR(30) NULL,
  document VARCHAR(30) NULL,
  city VARCHAR(100) NULL,
  address VARCHAR(255) NULL,
  status ENUM('Ativo', 'Inativo') NOT NULL DEFAULT 'Ativo',
  created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO products
  (name, brand, category, price, old_price, stock, badge, icon, description)
VALUES
  ('Notebook Aurora X14 Ryzen 7', 'NexVolt', 'Notebooks', 4599.90, 5299.90, 12, 'Oferta', 'pi-desktop', 'Notebook leve para estudos, trabalho e desenvolvimento.'),
  ('Smartphone Pulse 5G 256 GB', 'VoltOne', 'Smartphones', 2199.90, 2499.90, 20, 'Novo', 'pi-mobile', 'Smartphone 5G com bateria de longa duracao.'),
  ('Teclado Mecanico Spark RGB', 'KeyLab', 'Perifericos', 349.90, NULL, 34, NULL, 'pi-keyboard', 'Teclado mecanico compacto com iluminacao RGB.'),
  ('Headset NovaSound Pro', 'SoundPeak', 'Audio', 289.90, 329.90, 18, 'Top', 'pi-headphones', 'Headset confortavel com microfone removivel.')
ON DUPLICATE KEY UPDATE name = VALUES(name);

INSERT INTO clients
  (name, email, phone, document, city, address, status)
VALUES
  ('Ana Souza', 'ana.souza@email.com', '(11) 98888-1200', '111.111.111-11', 'Sao Paulo', 'Rua das Flores, 100', 'Ativo'),
  ('Carlos Lima', 'carlos.lima@email.com', '(21) 97777-3344', '222.222.222-22', 'Rio de Janeiro', 'Avenida Central, 250', 'Ativo'),
  ('Bianca Rocha', 'bianca.rocha@email.com', '(31) 96666-7788', '333.333.333-33', 'Belo Horizonte', 'Rua Minas, 45', 'Inativo')
ON DUPLICATE KEY UPDATE name = VALUES(name);
