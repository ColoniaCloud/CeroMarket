import * as migration_20261120_105437_estructura_inicial from './20261120_105437_estructura_inicial';
import * as migration_20261120_121332_productos_granel_codigo from './20261120_121332_productos_granel_codigo';
import * as migration_20261120_123530_listas_de_precios from './20261120_123530_listas_de_precios';

export const migrations = [
  {
    up: migration_20261120_105437_estructura_inicial.up,
    down: migration_20261120_105437_estructura_inicial.down,
    name: '20261120_105437_estructura_inicial',
  },
  {
    up: migration_20261120_121332_productos_granel_codigo.up,
    down: migration_20261120_121332_productos_granel_codigo.down,
    name: '20261120_121332_productos_granel_codigo',
  },
  {
    up: migration_20261120_123530_listas_de_precios.up,
    down: migration_20261120_123530_listas_de_precios.down,
    name: '20261120_123530_listas_de_precios'
  },
];
