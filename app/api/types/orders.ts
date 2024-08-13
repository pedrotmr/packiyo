export type OrderResponse = {
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
  data: Order[];
  included?: (Customer | ContactInformation)[];
};

export type SingleOrderResponse = {
  jsonapi?: { version: string };
  links?: {
    first?: string;
    last?: string;
  };
  data: Order;
  included?: (Customer | ContactInformation)[];
};

export type Attributes = {
  [key: string]: string | number | null;
};

export type Order = {
  type: "orders";
  id: string;
  attributes: {
    number: string;
    status_text?: string;
    shipping?: number;
    tax?: number;
    discount?: number;
    total?: number;
    ready_to_ship?: number;
    ready_to_pick?: number;
    is_wholesale?: boolean | null;
    fraud_hold?: number;
    address_hold?: number;
    payment_hold?: number;
    operator_hold?: number;
    allow_partial?: number;
    ordered_at?: Date;
    updated_at?: Date;
    fulfilled_at?: string | null;
    cancelled_at?: string | null;
    archived_at?: string | null;
    hold_until?: string | null;
    ship_before?: string | null;
    scheduled_delivery?: string | null;
    external_id?: string;
    packing_note?: string | null;
    shipping_method_name?: string | null;
    shipping_method_code?: string | null;
    tote?: string;
    tags?: string;
    created_at?: Date;
  };
  relationships?: {
    customer?: {
      links?: {
        related?: string;
        self?: string;
      };
      data?: {
        type?: string;
        id?: string;
      };
    };
    shipping_method?: {
      links?: {
        related?: string;
        self?: string;
      };
      data?: null | {
        type?: string;
        id?: string;
      };
    };
    shipping_contact_information?: {
      links?: {
        related?: string;
        self?: string;
      };
      data?: {
        type?: string;
        id?: string;
      };
    };
    billing_contact_information?: {
      links?: {
        related?: string;
        self?: string;
      };
      data?: {
        type?: string;
        id?: string;
      };
    };
    order_channel?: {
      links?: {
        related?: string;
        self?: string;
      };
      data?: {
        type?: string;
        id?: string;
      };
    };
    shipping_box?: {
      links?: {
        related?: string;
        self?: string;
      };
      data?: null | {
        type?: string;
        id?: string;
      };
    };
    order_items?: {
      links?: {
        related?: string;
        self?: string;
      };
      data?: {
        type?: string;
        id?: string;
      }[];
    };
    shipments?: {
      links?: {
        related?: string;
        self?: string;
      };
      data?: {
        type?: string;
        id?: string;
      }[];
    };
    returns?: {
      links?: {
        related?: string;
        self?: string;
      };
      data?: {
        type?: string;
        id?: string;
      }[];
    };
  };
  links?: {
    self?: string;
  };
};

export type Customer = {
  type: "customers";
  id: string;
  attributes: {
    created_at: string;
    updated_at: string;
    source: string;
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
    price?: string | null;
    sku?: string | null;
    quantity?: string | null;
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
    price?: string | null;
    sku?: string | null;
    quantity?: string | null;
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
