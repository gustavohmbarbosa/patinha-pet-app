type retornoProps = {
  erro?: boolean;
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
};

export async function getCep(cep: string) {
  const cepNoMask = cep.replace(/\D/g, "");

  try {
    const retorno = await fetch(`https://viacep.com.br/ws/${cepNoMask}/json/`);
    const cepInfo: retornoProps = await retorno.json();

    if (cepInfo.erro) {
      throw new Error("Cep inexistente!");
    }
    
    return cepInfo;
  } catch (error) {
    throw new Error("Erro ao buscar cep, verifique o cep inserido.");
  }
}
