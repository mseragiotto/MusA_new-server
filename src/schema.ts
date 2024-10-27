// Schema for OpenAPI swagger integration


import { OpenAPIV3 } from 'openapi-types';

interface FastifySchema extends OpenAPIV3.NonArraySchemaObject {
  $id?: string;
}

const schema: Record<string, FastifySchema> = {
  ArlArtwork: {
    $id: 'ArlArtwork',
    type: 'object',
    properties: {
      artwork: {
        type: 'number'
      },
      arl_floor: {
        type: 'number'
      },
      artwork_id: {
        $ref: 'Artwork#'
      },
      arl_floor_id: {
        $ref: 'ArlFloor#'
      },
      latitude: {
        type: 'number'
      },
      longitude: {
        type: 'number'
      },
      height: {
        type: 'number'
      },
      creation_date: {
        type: 'string',
        format: 'date-time'
      },
      last_update: {
        type: 'string',
        format: 'date-time'
      },
      version: {
        type: 'number'
      }
    }
  },
  ArlFloor: {
    $id: 'ArlFloor',
    type: 'object',
    properties: {
      id: {
        type: 'number'
      },
      name: {
        type: 'string'
      },
      floor: {
        $ref: 'Floor#'
      },
      museum: {
        $ref: 'Museum#'
      },
      creation_date: {
        type: 'string',
        format: 'date-time'
      },
      last_update: {
        type: 'string',
        format: 'date-time'
      },
      version: {
        type: 'number'
      }
    }
  },
  Artwork: {
    $id: 'Artwork',
    type: 'object',
    properties: {
      id: {
        type: 'number'
      },
      name: {
        type: 'string'
      },
      author: {
        $ref: 'Author#'
      },
      museum: {
        $ref: 'Museum#'
      },
      main_image: {
        $ref: 'Image#'
      },
      thumbnail: {
        $ref: 'Image#'
      },
      width: {
        type: 'number'
      },
      macroareas_image: {
        $ref: 'Image#'
      },
      creation_date: {
        type: 'string',
        format: 'date-time'
      },
      last_update: {
        type: 'string',
        format: 'date-time'
      },
      threedimensionalmodel: {
        type: 'string'
      },
      published: {
        type: 'boolean'
      },
      floor: {
        $ref: 'Floor#'
      },
      version: {
        type: 'number'
      }
    }
  },
  Audio: {
    $id: 'Audio',
    type: 'object',
    properties: {
      id: {
        type: 'number'
      },
      base64: {
        type: 'string'
      },
      creation_date: {
        type: 'string',
        format: 'date-time'
      },
      last_update: {
        type: 'string',
        format: 'date-time'
      },
      version: {
        type: 'number'
      }
    }
  },
  Author: {
    $id: 'Author',
    type: 'object',
    properties: {
      id: {
        type: 'number'
      },
      name: {
        type: 'string'
      },
      bio: {
        type: 'string'
      },
      image: {
        $ref: 'Image#'
      },
      creation_date: {
        type: 'string',
        format: 'date-time'
      },
      last_update: {
        type: 'string',
        format: 'date-time'
      },
      published: {
        type: 'boolean'
      },
      version: {
        type: 'number'
      }
    }
  },
  ChapterArea: {
    $id: 'ChapterArea',
    type: 'object',
    properties: {
      id: {
        type: 'number'
      },
      chapter: {
        $ref: 'Chapter#'
      },
      macroarea: {
        $ref: 'Macroarea#'
      }
    }
  },
  Chapter: {
    $id: 'Chapter',
    type: 'object',
    properties: {
      id: {
        type: 'number'
      },
      title: {
        type: 'string'
      },
      text: {
        type: 'string'
      },
      'number': {
        type: 'number'
      },
      overlay_image: {
        $ref: 'Image#'
      },
      artwork: {
        $ref: 'Artwork#'
      },
      touch_area: {
        $ref: 'Image#'
      },
      audio: {
        $ref: 'Audio#'
      },
      creation_date: {
        type: 'string',
        format: 'date-time'
      },
      last_update: {
        type: 'string',
        format: 'date-time'
      },
      published: {
        type: 'boolean'
      },
      version: {
        type: 'number'
      }
    }
  },
  ConnectionGroup: {
    $id: 'ConnectionGroup',
    type: 'object',
    properties: {
      id: {
        type: 'number'
      },
      name: {
        type: 'string'
      },
      type: {
        type: 'string'
      },
      museum: {
        $ref: 'Museum#'
      }
    }
  },
  FloorsConnection: {
    $id: 'FloorsConnection',
    type: 'object',
    properties: {
      id: {
        type: 'number'
      },
      connection_group: {
        $ref: 'ConnectionGroup#'
      },
      source_floor: {
        $ref: 'Floor#'
      },
      target_floor: {
        $ref: 'Floor#'
      },
      x_meters: {
        type: 'number'
      },
      y_meters: {
        type: 'number'
      },
      x_pixels: {
        type: 'number'
      },
      y_pixels: {
        type: 'number'
      },
      latitude: {
        type: 'number'
      },
      longitude: {
        type: 'number'
      },
      creation_date: {
        type: 'string',
        format: 'date-time'
      },
      last_update: {
        type: 'string',
        format: 'date-time'
      }
    }
  },
  Floor: {
    $id: 'Floor',
    type: 'object',
    properties: {
      id: {
        type: 'number'
      },
      name: {
        type: 'string'
      },
      museum: {
        $ref: 'Museum#'
      },
      floor_order: {
        type: 'number'
      },
      latitude: {
        type: 'number'
      },
      longitude: {
        type: 'number'
      },
      rotation: {
        type: 'number'
      },
      width: {
        type: 'number'
      },
      height: {
        type: 'number'
      },
      main_floor: {
        type: 'boolean'
      },
      image: {
        $ref: 'Image#'
      },
      graph: {
        $ref: 'Graph#'
      },
      published: {
        type: 'boolean'
      },
      arl_floor: {
        $ref: 'ArlFloor#'
      },
      creation_date: {
        type: 'string',
        format: 'date-time'
      },
      last_update: {
        type: 'string',
        format: 'date-time'
      },
      version: {
        type: 'number'
      }
    }
  },
  Graph: {
    $id: 'Graph',
    type: 'object',
    properties: {
      id: {
        type: 'number'
      },
      cell_size_meters: {
        type: 'number'
      },
      cell_size_pixels: {
        type: 'number'
      },
      rows: {
        type: 'number'
      },
      columns: {
        type: 'number'
      },
      wall_distance_meters: {
        type: 'number'
      },
      cell_offset: {
        type: 'number'
      },
      nodes: {
        type: 'string'
      },
      creation_date: {
        type: 'string',
        format: 'date-time'
      },
      last_update: {
        type: 'string',
        format: 'date-time'
      },
      version: {
        type: 'number'
      }
    }
  },
  Image: {
    $id: 'Image',
    type: 'object',
    properties: {
      id: {
        type: 'number'
      },
      base64: {
        type: 'string'
      },
      creation_date: {
        type: 'string',
        format: 'date-time'
      },
      last_update: {
        type: 'string',
        format: 'date-time'
      },
      version: {
        type: 'number'
      }
    }
  },
  Macroarea: {
    $id: 'Macroarea',
    type: 'object',
    properties: {
      id: {
        type: 'number'
      },
      title: {
        type: 'string'
      },
      colour: {
        type: 'string'
      },
      creation_date: {
        type: 'string',
        format: 'date-time'
      },
      last_update: {
        type: 'string',
        format: 'date-time'
      }
    }
  },
  Museum: {
    $id: 'Museum',
    type: 'object',
    properties: {
      id: {
        type: 'number'
      },
      name: {
        type: 'string'
      },
      latitude: {
        type: 'number'
      },
      longitude: {
        type: 'number'
      },
      address: {
        type: 'string'
      },
      website: {
        type: 'string'
      },
      geolocked: {
        type: 'boolean'
      },
      ar_icon: {
        $ref: 'Image#'
      },
      logo: {
        $ref: 'Image#'
      },
      backgroundimage: {
        $ref: 'Image#'
      },
      creation_date: {
        type: 'string',
        format: 'date-time'
      },
      last_update: {
        type: 'string',
        format: 'date-time'
      },
      published: {
        type: 'boolean'
      },
      arl_file: {
        type: 'string'
      },
      version: {
        type: 'number'
      }
    }
  },
  PointOfInterestCategories: {
    $id: 'PointOfInterestCategories',
    type: 'object',
    properties: {
      id: {
        type: 'number'
      },
      name: {
        type: 'string'
      },
      museum: {
        $ref: 'Museum#'
      },
      width_pixels: {
        type: 'number'
      },
      height_pixels: {
        type: 'number'
      },
      colour: {
        type: 'string'
      },
      image: {
        $ref: 'Image#'
      }
    }
  },
  PointsOfInterest: {
    $id: 'PointsOfInterest',
    type: 'object',
    properties: {
      id: {
        type: 'number'
      },
      name: {
        type: 'string'
      },
      floor: {
        $ref: 'Floor#'
      },
      x_meters: {
        type: 'number'
      },
      y_meters: {
        type: 'number'
      },
      x_pixels: {
        type: 'number'
      },
      y_pixels: {
        type: 'number'
      },
      latitude: {
        type: 'number'
      },
      longitude: {
        type: 'number'
      },
      category: {
        $ref: 'PointOfInterestCategories#'
      },
      published: {
        type: 'boolean'
      },
      creation_date: {
        type: 'string',
        format: 'date-time'
      },
      last_update: {
        type: 'string',
        format: 'date-time'
      },
      version: {
        type: 'number'
      }
    }
  },
  Roles: {
    $id: 'Roles',
    type: 'object',
    properties: {
      level: {
        type: 'number'
      },
      description: {
        type: 'string'
      }
    }
  },
  RouteArtwork: {
    $id: 'RouteArtwork',
    type: 'object',
    properties: {
      route_id: {
        type: 'number'
      },
      work_id: {
        type: 'number'
      },
      route: {
        $ref: 'Route#'
      },
      artwork: {
        $ref: 'Artwork#'
      },
      order: {
        type: 'number'
      }
    }
  },
  Route: {
    $id: 'Route',
    type: 'object',
    properties: {
      id: {
        type: 'number'
      },
      name: {
        type: 'string'
      },
      description: {
        type: 'string'
      },
      museum: {
        $ref: 'Museum#'
      },
      creation_date: {
        type: 'string',
        format: 'date-time'
      },
      last_update: {
        type: 'string',
        format: 'date-time'
      }
    }
  },
  User: {
    $id: 'User',
    type: 'object',
    properties: {
      id: {
        type: 'number'
      },
      username: {
        type: 'string'
      },
      password: {
        type: 'string'
      },
      role: {
        $ref: 'Roles#'
      }
    }
  }
};

export default schema;