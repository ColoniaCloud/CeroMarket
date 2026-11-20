import * as migration_20261120_105437_estructura_inicial from "./20261120_105437_estructura_inicial";
import * as migration_20261120_105500_contenido_inicial from "./20261120_105500_contenido_inicial";

export const migrations = [
  {
    up: migration_20261120_105437_estructura_inicial.up,
    down: migration_20261120_105437_estructura_inicial.down,
    name: "20261120_105437_estructura_inicial",
  },
  {
    up: migration_20261120_105500_contenido_inicial.up,
    down: migration_20261120_105500_contenido_inicial.down,
    name: "20261120_105500_contenido_inicial",
  },
];
