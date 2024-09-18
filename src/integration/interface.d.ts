export interface IRequestAcesseTokenResponse {
  access_token: string;
  expires_in: number;
  token_type: string;
  scope: string;
  refresh_token: string;
}

export interface IInsertProductResponse {
  data: {
    id: number;
    variations?: Object;
    warnings: Array<Object>;
  };
}

export enum IInsertProductTipoEnum {
  PRODUTO = "P",
  SERVICO = "S",
}

export enum IInsertProductFormatoEnum {
  SIMPLES = "P",
  VARIACOES = "V",
  COMPOSICAO = "E",
}

export interface IInsertProductData {
  id?: number;
  nome: string;
  codigo?: string;
  preco: number;
  tipo: IInsertProductTipoEnum;
  situacao?: string;
  formato: IInsertProductFormatoEnum;
  descricaoCurta?: string;
  dataValidade?: string;
  unidade?: string;
  pesoLiquido?: number;
  pesoBruto?: number;
  volumes?: number;
  itensPorCaixa?: number;
  gtin?: string;
  gtinEmbalagem?: string;
  tipoProducao?: string;
  condicao?: number;
  freteGratis?: boolean;
  marca?: string;
  descricaoComplementar?: string;
  linkExterno?: string;
  observacoes?: string;
  descricaoEmbalagemDiscreta?: string;
  categoria?: {
    id: number;
  };
  estoque?: {
    minimo?: number;
    maximo: number;
    crossdocking?: number;
    localizacao?: string;
  };
  actionEstoque?: string;
  dimensoes?: {
    largura: number;
    altura: number;
    profundidade: number;
    unidadeMedida: number;
  };
  tributacao?: {
    origem: number;
    nFCI: string;
    ncm: string;
    cest: string;
    codigoListaServicos: string;
    spedTipoItem: string;
    codigoItem: string;
    percentualTributos: number;
    valorBaseStRetencao: number;
    valorStRetencao: number;
    valorICMSSubstituto: number;
    codigoExcecaoTipi: string;
    classeEnquadramentoIpi: string;
    valorIpiFixo: number;
    codigoSeloIpi: string;
    valorPisFixo: number;
    valorCofinsFixo: number;
    codigoANP: string;
    descricaoANP: string;
    percentualGLP: number;
    percentualGasNacional: number;
    percentualGasImportado: number;
    valorPartida: number;
    tipoArmamento: number;
    descricaoCompletaArmamento: string;
    dadosAdicionais: string;
    grupoProduto?: {
      id: number;
    };
  };
  midia?: {
    video: {
      url: string;
    };
    imagens: {
      externas: [
        {
          link: string;
        }
      ];
    };
  };
  linhaProduto?: {
    id: number;
  };
  estrutura?: {
    tipoEstoque: string;
    lancamentoEstoque: string;
    componentes: [
      {
        produto: {
          id: number;
        };
        quantidade: number;
      }
    ];
  };
  camposCustomizados?: [
    {
      idCampoCustomizado: number;
      idVinculo: string;
      valor: string;
      item: string;
    }
  ];
  variacoes?: [
    {
      id: number;
      nome: string;
      codigo?: string;
      preco: number;
      tipo?: string;
      situacao?: string;
      formato?: string;
      descricaoCurta?: string;
      dataValidade?: string;
      unidade: string;
      pesoLiquido?: number;
      pesoBruto?: number;
      volumes?: number;
      itensPorCaixa?: number;
      gtin?: string;
      gtinEmbalagem?: string;
      tipoProducao?: string;
      condicao?: number;
      freteGratis?: boolean;
      marca?: string;
      descricaoComplementar?: string;
      linkExterno?: string;
      observacoes?: string;
      descricaoEmbalagemDiscreta?: string;
      categoria?: {
        id: number;
      };
      estoque?: {
        minimo: number;
        maximo: number;
        crossdocking: number;
        localizacao: string;
      };
      actionEstoque: string;
      dimensoes?: {
        largura: number;
        altura: number;
        profundidade: number;
        unidadeMedida: number;
      };
      tributacao?: {
        origem: number;
        nFCI: string;
        ncm: string;
        cest: string;
        codigoListaServicos: string;
        spedTipoItem: string;
        codigoItem: string;
        percentualTributos: number;
        valorBaseStRetencao: number;
        valorStRetencao: number;
        valorICMSSubstituto: number;
        codigoExcecaoTipi: string;
        classeEnquadramentoIpi: string;
        valorIpiFixo: number;
        codigoSeloIpi: string;
        valorPisFixo: number;
        valorCofinsFixo: number;
        codigoANP: string;
        descricaoANP: string;
        percentualGLP: number;
        percentualGasNacional: number;
        percentualGasImportado: number;
        valorPartida: number;
        tipoArmamento: number;
        descricaoCompletaArmamento: string;
        dadosAdicionais: string;
        grupoProduto?: {
          id: number;
        };
      };
      midia?: {
        video: {
          url: string;
        };
        imagens: {
          externas: [
            {
              link: string;
            }
          ];
        };
      };
      linhaProduto: {
        id: number;
      };
      estrutura: {
        tipoEstoque: string;
        lancamentoEstoque: string;
        componentes: [
          {
            produto: {
              id: number;
            };
            quantidade: number;
          }
        ];
      };
      camposCustomizados: [
        {
          idCampoCustomizado: number;
          idVinculo: string;
          valor: number;
          item: number;
        }
      ];
      variacao: {
        nome: string;
        ordem: number;
        produtoPai: {
          cloneInfo: boolean;
        };
      };
    }
  ];
}

export interface IGetProductsFromDealResponse {
  success: boolean;
  data: IGetProductsFromDealData[];
  additional_data: {
    products_quantity_total: number;
    products_sum_total: number;
    products_quantity_total_formatted: string;
    products_sum_total_formatted: string;
    pagination: {
      start: number;
      limit: number;
      more_items_in_collection: boolean;
      next_start?: number;
    };
  };
}

export interface IGetProductsFromDealData {
  id: number;
  deal_id: number;
  product_id: number;
  product_variation_id: any;
  name: string;
  order_nr: number;
  item_price: number;
  quantity: number;
  sum: number;
  currency: string;
  active_flag: boolean;
  enabled_flag: boolean;
  add_time: string;
  last_edit: string;
  comments: any;
  tax: number;
  quantity_formatted: string;
  sum_formatted: string;
  tax_method: string;
  discount: number;
  discount_type: string;
  billing_frequency: string;
  billing_frequency_cycles: any;
  billing_start_date: any;
  product: any;
}
