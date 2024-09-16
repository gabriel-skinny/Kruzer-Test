export interface IRequestAcesseTokenResponse {
  access_token: string;
  expires_in: number;
  token_type: string;
  scope: string;
  refresh_token: string;
}

interface IDefault {
  numeroLoja: "123";
  dataPrevista: string;
}

export interface IInsertProductData {
  id?: number;
  nome: string;
  codigo?: string;
  preco: number;
  tipo?: string;
  situacao?: string;
  formato?: string;
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
    minimo: number;
    maximo: number;
    crossdocking: number;
    localizacao: string;
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
