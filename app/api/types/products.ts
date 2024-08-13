export type ProductResponse = {
  meta?: {
    page: {
      currentPage: number;
      from: number;
      lastPage: number;
      perPage: number;
      to: number;
      total: number;
    };
  };
  jsonapi?: { version: string };
  links?: {
    first?: string;
    last?: string;
  };
  data: Product[];
  included?: (Customer | ContactInformation)[];
};

export type SingleProductResponse = {
  jsonapi: { version: string };
  links: {
    first?: string;
    last?: string;
  };
  data: Product;
  included: (Customer | ContactInformation)[];
};

export type Attributes = {
  [key: string]: string | number | null | boolean;
};

export type Product = {
  type: "products";
  id: string;
  attributes: {
    sku: string;
    name: string;
    type?: "regular" | "kit";
    price?: string;
    value?: string | null;
    customs_price?: string | null;
    hs_code?: string | null;
    country_of_origin?: string | null;
    notes?: string;
    width?: number | null;
    height?: number | null;
    length?: number | null;
    weight?: number | null;
    barcode?: string;
    customs_description?: string | null;
    tags?: string;
    inventory_sync?: number;
    quantity_on_hand?: number;
    quantity_allocated?: number;
    quantity_available?: number;
    quantity_backordered?: number;
    created_at?: string;
    updated_at?: string;
  };
  relationships: {
    customer?: {
      links: {
        related: string;
        self: string;
      };
      data: {
        type: string;
        id: string;
      };
    };
    barcodes?: {
      links: {
        related: string;
        self: string;
      };
      data: Barcode[];
    };
    product_images?: {
      links: {
        related: string;
        self: string;
      };
      data: ProductImage[];
    };
    location_products?: {
      links: {
        related: string;
        self: string;
      };
    };
    kits?: {
      links: {
        related: string;
        self: string;
      };
    };
    components?: {
      links: {
        related: string;
        self: string;
      };
    };
  };
  links: {
    self: string;
  };
};

export type Customer = {
  type: "customers";
  id: string;
  attributes: {
    created_at: string;
    updated_at: string;
    source: string;
  };
  relationships: {
    contact_information: {
      data: ContactInformation;
    };
  };
};

export type ContactInformation = {
  type: "contact-informations";
  id: string;
  attributes: {
    name: string;
    company_name?: string | null;
    address?: string | null;
    address2?: string | null;
    city?: string | null;
    state?: string | null;
    zip?: string | null;
    country: string;
    email?: string | null;
    phone?: string | null;
    created_at: string;
    updated_at: string;
    source: string;
  };
};

export type Barcode = {
  type: "barcodes";
  id: string;
};

export type ProductImage = {
  type: "product-images";
  id: string;
};
