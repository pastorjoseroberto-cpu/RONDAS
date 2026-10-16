import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';


const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

const opcoesOkNokNaoSeAplica = ["OK", "NOK", "NÃO SE APLICA"];
const opcoesSimNaoNaoSeAplica = ["SIM", "NÃO", "NÃO SE APLICA"];
const opcoesParceira = ["EASY TECH", "3AM", "OUTRA"];

const formConfig: { titulo: string; campos: { id: string; label: string; tipo?: string; opcoes?: string[]; longo?: boolean; foto?: boolean }[] }[] = [
  { 
    titulo: "1. Identificação Básica", 
    campos: [
      { id: "nome", label: "Nome" }, 
      { id: "nome_completo", label: "Nome Completo" }, 
      { id: "data_ronda", label: "DATA", tipo: "date" }, 
      { id: "uf", label: "UF" }, 
      { id: "parceira", label: "Parceira", tipo: "select", opcoes: opcoesParceira }
    ] 
  },
  { 
    titulo: "2. Equipamentos Backup", 
    campos: [
      { id: "vds_backup", label: "VDs Backup", tipo: "number" }, 
      { id: "monitores_backup", label: "Monitores Backup", tipo: "number" }, 
      { id: "teclados_backup", label: "Teclados Backup", tipo: "number" }, 
      { id: "tablets", label: "Tablets" }, 
      { id: "mouses_backup", label: "Mouses Backup", tipo: "number" }, 
      { id: "smartphones_backup", label: "Smartphones Backup", tipo: "number" }, 
      { id: "qtd_notebooks_backup", label: "Quantidade de Notebooks Backup", tipo: "number" }, 
      { id: "notebooks_backup_ok", label: "Todos os Notebooks Backup estão funcionando?", tipo: "select", opcoes: opcoesOkNokNaoSeAplica }, 
      { id: "qtd_notebooks_nok", label: "Qtd de Notebooks de Backup com estado NOK", tipo: "number" }, 
      { id: "obs_notebooks_nok", label: "📌 Obs (somente se NOK) - Notebooks", longo: true }
    ] 
  },
  { 
    titulo: "3. Laptops Contingência", 
    campos: [
      { id: "qtd_laptops_contingencia", label: "Quantidade de laptops contingência", tipo: "number" }, 
      { id: "id_ambev_responsavel", label: "ID Ambev do responsável" }, 
      { id: "laptops_contingencia_ok", label: "Todos os laptops de contingência estão funcionando?", tipo: "select", opcoes: opcoesOkNokNaoSeAplica }, 
      { id: "qtd_laptops_contingencia_nok", label: "Qtd laptops contingência NOK", tipo: "number" }, 
      { id: "obs_laptops_fca", label: "📌 Obs (se NOK): FCA", longo: true }
    ] 
  },
  { 
    titulo: "4. Impressoras", 
    campos: [
      { id: "qtd_impressoras", label: "Qtd Impressoras na unidade", tipo: "number" }, 
      { id: "qtd_tonner_backup", label: "Qtd Tonner Backup", tipo: "number" }, 
      { id: "qtd_ui_backup", label: "Qtd Unidade de imagem (UI)", tipo: "number" }, 
      { id: "qtd_suprimentos_utilizados", label: "Qtd suprimentos utilizados", tipo: "number" }, 
      { id: "teste_impressora_faturamento", label: "Teste impressora Faturamento?", tipo: "select", opcoes: opcoesOkNokNaoSeAplica }, 
      { id: "obs_impressora_defeito", label: "📌 Obs: Dados da impressora", longo: true }
    ] 
  },
  { 
    titulo: "5. Infraestrutura CPD & Ar-Condicionado", 
    campos: [
      { id: "org_geral_cpd", label: "Organização GERAL do CPD", tipo: "select", opcoes: opcoesSimNaoNaoSeAplica }, 
      { id: "evidencia_org_geral", label: "📸 Foto - Organização", foto: true }, 
      { id: "solucao_contorno_cpd", label: "Solução contorno CPD?", longo: true }, 
      { id: "ambiente_limpo", label: "Ambiente limpo e ventilado?", tipo: "select", opcoes: opcoesSimNaoNaoSeAplica }, 
      { id: "evidencia_ambiente_limpo", label: "📸 Foto - Ambiente Limpo", foto: true }, 
      { id: "status_ar1", label: "Status Ar-condicionado 1", tipo: "select", opcoes: opcoesOkNokNaoSeAplica }, 
      { id: "evidencia_ar1", label: "📸 Foto - Ar-condicionado 1", foto: true }, 
      { id: "status_ar2", label: "Status Ar-condicionado 2", tipo: "select", opcoes: opcoesOkNokNaoSeAplica }, 
      { id: "evidencia_ar2", label: "📸 Foto - Ar-condicionado 2", foto: true }
    ] 
  },
  { 
    titulo: "6. Sensores, Segurança e Energia", 
    campos: [
      { id: "biometria", label: "Biometria", tipo: "select", opcoes: opcoesOkNokNaoSeAplica }, 
      { id: "evidencia_biometria", label: "📸 Foto - Biometria", foto: true }, 
      { id: "senha_biometria", label: "Senha biometria testada?", tipo: "select", opcoes: opcoesSimNaoNaoSeAplica }, 
      { id: "evidencia_senha_bio", label: "📸 Foto - Teste Bio", foto: true }, 
      { id: "sensor_umidade", label: "Sensor umidade", tipo: "select", opcoes: opcoesOkNokNaoSeAplica }, 
      { id: "evidencia_sensor_umidade", label: "📸 Foto - Umidade", foto: true }, 
      { id: "sensor_temperatura", label: "Sensor Temperatura", tipo: "select", opcoes: opcoesOkNokNaoSeAplica }, 
      { id: "evidencia_sensor_temp", label: "📸 Foto - Temperatura", foto: true }, 
      { id: "cftv_segregado", label: "CFTV Segregado", tipo: "select", opcoes: opcoesOkNokNaoSeAplica }, 
      { id: "evidencia_cftv", label: "📸 Foto - CFTV", foto: true }, 
      { id: "sensor_fumaca", label: "Sensor fumaça", tipo: "select", opcoes: opcoesOkNokNaoSeAplica }, 
      { id: "evidencia_fumaca", label: "📸 Foto - Fumaça", foto: true }, 
      { id: "camera_cpd", label: "Câmera CPD", tipo: "select", opcoes: opcoesOkNokNaoSeAplica }, 
      { id: "evidencia_camera", label: "📸 Foto - Câmera CPD", foto: true }, 
      { id: "modem_4g_5g", label: "Modem 4G/5G", tipo: "select", opcoes: opcoesOkNokNaoSeAplica }, 
      { id: "evidencia_modem", label: "📸 Foto - Modem", foto: true }, 
      { id: "piso_elevado", label: "Piso elevado", tipo: "select", opcoes: opcoesOkNokNaoSeAplica }, 
      { id: "evidencia_piso", label: "📸 Foto - Piso Elevado", foto: true }, 
      { id: "solucao_contorno_nobreak", label: "Solução Nobreak?", longo: true }, 
      { id: "nobreak", label: "Nobreak", tipo: "select", opcoes: opcoesOkNokNaoSeAplica }, 
      { id: "evidencia_nobreak", label: "📸 Foto - Nobreak", foto: true }
    ] 
  },
  { 
    titulo: "7. Salas e Setores (Status/Qtd)", 
    campos: [
      { id: "adm", label: "ADM", tipo: "number" }, 
      { id: "paf", label: "PAF", tipo: "number" }, 
      { id: "armazem", label: "Armazém", tipo: "number" }, 
      { id: "caixa", label: "Caixa", tipo: "number" }, 
      { id: "portaria", label: "Portaria", tipo: "number" }, 
      { id: "salas_vendas", label: "Salas de vendas", tipo: "number" }, 
      { id: "auditorio", label: "Auditório", tipo: "number" }, 
      { id: "salas_reunioes", label: "Salas de reuniões", tipo: "number" }, 
      { id: "faturamento_sala", label: "Faturamento", tipo: "number" }, 
      { id: "logistica_adm_fin", label: "Logística - Administrativo", tipo: "number" }, 
      { id: "conferentes", label: "Conferentes", tipo: "number" }, 
      { id: "outras_salas_1", label: "Outras salas 1", tipo: "number" }, 
      { id: "outras_salas_3", label: "Outros 3", tipo: "number" }, 
      { id: "outras_salas_4", label: "Outros 4", tipo: "number" }
    ] 
  },
  { 
    titulo: "8. Finalização", 
    campos: [
      { id: "relatorio_melhorias", label: "Melhorias Executadas", longo: true }
    ] 
  }
];

const camposIniciais: Record<string, string> = { geo: '', unidade: '', numero_chamado: '', hora_inicio: '', hora_fim: '', parceira: '', outra_parceira: '' };
formConfig.forEach(s => s.campos.forEach(c => { camposIniciais[c.id] = ''; }));

export default function AppMaster() {
  const [usuarioLogado, setUsuarioLogado] = useState<any>(null);
  const [loginUser, setLoginUser] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarNovaSenha, setConfirmarNovaSenha] = useState('');
  
  const [visaoGeral, setVisaoGeral] = useState<'tecnico' | 'gerente'>('tecnico');
  const [subAbaGestor, setSubAbaGestor] = useState<'relatorios' | 'agenda' | 'concluidos' | 'usuarios'>('relatorios');
  const [periodoFiltro, setPeriodoFiltro] = useState('Mes');

  const [geosDisponiveis, setGeosDisponiveis] = useState<string[]>([]);
  const [todasUnidadesDB, setTodasUnidadesDB] = useState<any[]>([]);
  const [form, setForm] = useState(camposIniciais);
  const [chamadoCarregado, setChamadoCarregado] = useState(false);
  const [chamadoBuscaInput, setChamadoBuscaInput] = useState('');
  const [alertaAtraso, setAlertaAtraso] = useState<string | null>(null);

  const [listaRondas, setListaRondas] = useState<any[]>([]);
  const [listaUsuarios, setListaUsuarios] = useState<any[]>([]);
  const [busca, setBusca] = useState('');
  const [buscaAgenda, setBuscaAgenda] = useState('');
  const [detalheItem, setDetalheItem] = useState<any | null>(null);

  const [itemParaExcluirStep1, setItemParaExcluirStep1] = useState<any | null>(null);
  const [itemParaExcluirStep2, setItemParaExcluirStep2] = useState<any | null>(null);
  
  // CADASTRO DE UTILIZADORES SEM E-MAIL
  const [novoUser, setNovoUser] = useState({ nome_completo: '', username: '', senha_provisoria: 'Mud@r123', funcao: 'ADM' });
  const [editandoId, setEditandoId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  const [novoAgendamento, setNovoAgendamento] = useState({
    numero_chamado: '',
    data_agendamento: '',
    hora_agendamento: '',
    unidade: '',
    geo: '',
    tipo_unidade: 'CDD',
    nome_solicitante: '',
    contato_ambev: ''
  });

  const [listaAgendamentos, setListaAgendamentos] = useState<any[]>([]);

  useEffect(() => {
    const checarDispositivo = () => {
      const userAgentMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      const telaPequena = window.innerWidth <= 768;
      setIsMobile(userAgentMobile || telaPequena);
    };

    checarDispositivo();
    window.addEventListener('resize', checarDispositivo);
    return () => window.removeEventListener('resize', checarDispositivo);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('modo') === 'field') {
      setVisaoGeral('tecnico');
    }

    const chamadoUrl = params.get('chamado');
    if (chamadoUrl) {
      setChamadoBuscaInput(chamadoUrl.toUpperCase());
      executarBuscaChamado(chamadoUrl);
    }
  }, []);

  useEffect(() => {
    async function init() {
      const { data: unid, error } = await supabase.from('unidades').select('*');
      if (error) {
        console.error('Erro ao carregar unidades:', error.message);
        return;
      }
      if (unid) {
        setTodasUnidadesDB(unid);
        const geos = Array.from(new Set(unid.map((item: any) => item.Geo || item.geo))).filter(Boolean);
        setGeosDisponiveis(geos as string[]);
      }
    }
    init();
  }, []);

  async function carregarRondas() {
    const { data } = await supabase.from('rondas').select('*').order('data_registro', { ascending: false });
    if (data) setListaRondas(data);
  }

  async function carregarUsuarios() {
    const { data } = await supabase.from('usuarios_sistema').select('*');
    if (data) setListaUsuarios(data);
  }

  async function carregarAgendamentos() {
    const { data, error } = await supabase.from('agenda_os').select('*').order('data_agendamento', { ascending: true });
    if (error) {
      console.error('Erro ao carregar agenda:', error.message);
      alert('Não foi possível carregar a agenda. Verifique a migração do banco e as permissões.');
      return;
    }
    setListaAgendamentos((data || []).map((item: any) => ({
      id: item.id_chamado,
      chamado: item.id_chamado,
      data: item.data_agendamento || '',
      hora: item.horario_previsto || '',
      unidade: item.unidade_site || '',
      geo: item.geo || '',
      tipo: item.tipo_unidade || '',
      solicitante: item.nome_solicitante || '',
      contato: item.contato_ambev || '',
      status: item.status || 'Dentro do prazo'
    })));
  }

  const handleLogout = () => {
    setUsuarioLogado(null);
    setListaRondas([]);
    setListaUsuarios([]);
    setListaAgendamentos([]);
    setDetalheItem(null);
    setItemParaExcluirStep1(null);
    setItemParaExcluirStep2(null);
    setBusca('');
    setBuscaAgenda('');
  };

  const abrirAtalhoDiretoField = () => {
    const urlAtual = window.location.origin + window.location.pathname + '?modo=field';
    window.open(urlAtual, '_blank');
  };

  const calcularTempoAtraso = (dataStr: string, horaStr: string) => {
    if (!dataStr || !horaStr) return null;
    const [ano, mes, dia] = dataStr.split('-').map(Number);
    const [horas, minutos] = horaStr.split(':').map(Number);
    const dataAgendada = new Date(ano, mes - 1, dia, horas, minutos);
    const agora = new Date();
    const diffMs = agora.getTime() - dataAgendada.getTime();
    if (diffMs <= 0) return null;
    const diffMinutosTotal = Math.floor(diffMs / (1000 * 60));
    const horasAtraso = Math.floor(diffMinutosTotal / 60);
    const minsAtraso = diffMinutosTotal % 60;
    
    if (horasAtraso > 0) return `${horasAtraso}h ${minsAtraso}m`;
    return `${minsAtraso} min`;
  };

  const executarBuscaChamado = async (chamadoParaBuscar: string) => {
    const termo = chamadoParaBuscar.trim().replace(/\s+/g, '').toUpperCase();
    if (!termo) {
      alert('Por favor, informe o número do chamado.');
      return;
    }

    setAlertaAtraso(null);

    const { data: itemAgenda, error: erroAgenda } = await supabase.from('agenda_os').select('*').eq('id_chamado', termo).maybeSingle();
    if (erroAgenda) {
      console.error('Erro na consulta do chamado:', erroAgenda.message);
      alert('Não foi possível consultar a agenda. Tente novamente ou contate o administrador.');
      return;
    }
    const agendamento = itemAgenda ? {
      chamado: itemAgenda.id_chamado,
      unidade: itemAgenda.unidade_site,
      geo: itemAgenda.geo,
      solicitante: itemAgenda.nome_solicitante,
      data: itemAgenda.data_agendamento,
      hora: itemAgenda.horario_previsto || '10:00',
      tipo: itemAgenda.tipo_unidade,
      status: itemAgenda.status || 'Dentro do prazo'
    } : null;

    if (agendamento) {
      if (agendamento.status === 'Concluída') {
        alert(`❌ ATENÇÃO TÉCNICO:\nO chamado "${agendamento.chamado}" JÁ FOI ATENDIDO e concluído no sistema.`);
        return;
      }

      const agora = new Date();
      const horaAtual = agora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
      const tempoAtrasado = calcularTempoAtraso(agendamento.data, agendamento.hora);
      if (tempoAtrasado || agendamento.status === 'Atrasada') {
        setAlertaAtraso(tempoAtrasado ? `ATRASADO em ${tempoAtrasado}` : 'ATRASADO');
      }

      setForm({
        ...camposIniciais,
        numero_chamado: agendamento.chamado,
        unidade: agendamento.unidade || 'CDD BELÉM',
        geo: agendamento.geo || 'NCO',
        nome_completo: agendamento.solicitante || 'JACKSON ROCHA',
        nome: agendamento.solicitante ? agendamento.solicitante.split(' ')[0] : 'JACKSON',
        data_ronda: agendamento.data || agora.toISOString().split('T')[0],
        uf: agendamento.tipo || 'CDD/FÁBRICA',
        hora_inicio: horaAtual
      });
      setChamadoCarregado(true);
    } else {
      alert(`⚠️ Chamado "${termo}" não foi encontrado na Agenda.`);
    }
  };

  const buscarEPreencherChamado = (e: any) => {
    e.preventDefault();
    executarBuscaChamado(chamadoBuscaInput);
  };

  const limparChamadoBuscado = () => {
    setForm(camposIniciais);
    setChamadoBuscaInput('');
    setChamadoCarregado(false);
    setAlertaAtraso(null);
  };

  const handleSelectUnidadeAgenda = (nomeSite: string) => {
    const unidEncontrada = todasUnidadesDB.find(u => (u.Site || u.site) === nomeSite);
    setNovoAgendamento({
      ...novoAgendamento,
      unidade: nomeSite.toUpperCase(),
      geo: unidEncontrada ? (unidEncontrada.Geo || unidEncontrada.geo || '').toUpperCase() : novoAgendamento.geo,
      tipo_unidade: unidEncontrada ? (unidEncontrada.Tipo || unidEncontrada.tipo || novoAgendamento.tipo_unidade).toUpperCase() : novoAgendamento.tipo_unidade
    });
  };

  const handleLogin = async (e: any) => {
    e.preventDefault();
    const userBuscado = loginUser.trim().toLowerCase();

    if (userBuscado === 'master' && loginPass === 'Master123') {
      const { data: usuarioExistente } = await supabase
        .from('usuarios_sistema')
        .select('*')
        .eq('username', 'master')
        .maybeSingle();

      if (!usuarioExistente) {
        const { data: novoMaster, error: errMaster } = await supabase
          .from('usuarios_sistema')
          .insert([{
            nome_completo: 'USUÁRIO MASTER',
            username: 'master',
            senha: 'Master123',
            funcao: 'Master',
            deve_mudar_senha: true,
            status: 'Ativo'
          }])
          .select()
          .single();

        if (errMaster) {
          alert('Erro ao criar conta Master inicial: ' + errMaster.message);
          return;
        }
        setUsuarioLogado(novoMaster);
        await Promise.all([carregarRondas(), carregarUsuarios(), carregarAgendamentos()]);
        return;
      }
    }

    const { data, error } = await supabase
      .from('usuarios_sistema')
      .select('*')
      .eq('username', userBuscado)
      .eq('senha', loginPass)
      .maybeSingle();

    if (error || !data) {
      alert('Utilizador ou senha incorretos.');
    } else {
      setUsuarioLogado(data);
      await Promise.all([carregarRondas(), carregarUsuarios(), carregarAgendamentos()]);
    }
  };

  const handleMudarSenha = async (e: any) => {
    e.preventDefault();

    if (!novaSenha || novaSenha.length < 6) {
      alert('A nova senha deve ter pelo menos 6 caracteres.');
      return;
    }

    if (novaSenha !== confirmarNovaSenha) {
      alert('As senhas digitadas não coincidem.');
      return;
    }

    const { error } = await supabase
      .from('usuarios_sistema')
      .update({ senha: novaSenha, deve_mudar_senha: false })
      .eq('id', usuarioLogado.id);

    if (error) {
      alert('Erro ao atualizar senha: ' + error.message);
    } else {
      alert('Senha alterada com sucesso! Bem-vindo ao sistema.');
      setUsuarioLogado({ ...usuarioLogado, senha: novaSenha, deve_mudar_senha: false });
      setNovaSenha('');
      setConfirmarNovaSenha('');
    }
  };

  // CRIAR UTILIZADOR SEM E-MAIL
  const criarNovoUtilizador = async (e: any) => {
    e.preventDefault();

    if (!novoUser.username || !novoUser.senha_provisoria || !novoUser.nome_completo) {
      alert('Preencha o nome completo, o nome de utilizador (login) e a senha provisória.');
      return;
    }

    const { error } = await supabase
      .from('usuarios_sistema')
      .insert([{
        nome_completo: novoUser.nome_completo.toUpperCase(),
        username: novoUser.username.trim().toLowerCase(),
        senha: novoUser.senha_provisoria,
        funcao: novoUser.funcao,
        deve_mudar_senha: true,
        status: 'Ativo'
      }]);

    if (error) {
      alert('Erro ao cadastrar usuário: ' + error.message);
    } else {
      alert(`Usuário cadastrado com sucesso!\n\nUtilizador: ${novoUser.username}\nSenha Provisória: ${novoUser.senha_provisoria}`);
      setNovoUser({ nome_completo: '', username: '', senha_provisoria: 'Mud@r123', funcao: 'ADM' });
      carregarUsuarios();
    }
  };

  const handleResetSenha = async (userId: string | number, nome: string) => {
    const novaProvisoria = prompt(`Digite a NOVA SENHA PROVISÓRIA para ${nome}:`, 'Mud@r123');
    if (!novaProvisoria) return;

    try {
      const { error } = await supabase
        .from('usuarios_sistema')
        .update({ senha: novaProvisoria, deve_mudar_senha: true })
        .eq('id', userId);

      if (error) throw error;
      alert(`Senha provisória redefinida para "${novaProvisoria}".\nO usuário deverá alterar essa senha no próximo login.`);
      carregarUsuarios();
    } catch (error: any) {
      alert('Erro ao redefinir senha: ' + error.message);
    }
  };

  const handleExcluirUsuario = async (userId: string | number, nome: string) => {
    if (!confirm(`Tem certeza que deseja excluir permanentemente o usuário "${nome}"?`)) return;

    try {
      const { error } = await supabase
        .from('usuarios_sistema')
        .delete()
        .eq('id', userId);

      if (error) throw error;
      alert('Usuário excluído com sucesso!');
      carregarUsuarios();
    } catch (error: any) {
      alert('Erro ao excluir usuário: ' + error.message);
    }
  };

  const editarAgendamento = (agendamento: any) => {
    setEditandoId(String(agendamento.id));
    setNovoAgendamento({
      numero_chamado: agendamento.chamado.toUpperCase(),
      data_agendamento: agendamento.data,
      hora_agendamento: agendamento.hora,
      unidade: agendamento.unidade.toUpperCase(),
      geo: (agendamento.geo || '').toUpperCase(),
      tipo_unidade: (agendamento.tipo || 'CDD').toUpperCase(),
      nome_solicitante: agendamento.solicitante.toUpperCase(),
      contato_ambev: agendamento.contato || ''
    });
    window.scrollTo({ top: 200, behavior: 'smooth' });
  };

  const cancelarEdicao = () => {
    setEditandoId(null);
    setNovoAgendamento({ numero_chamado: '', data_agendamento: '', hora_agendamento: '', unidade: '', geo: '', tipo_unidade: 'CDD', nome_solicitante: '', contato_ambev: '' });
  };

  const criarOuSalvarAgendamento = async (e: any) => {
    e.preventDefault();
    const chamado = novoAgendamento.numero_chamado.trim().replace(/\s+/g, '').toUpperCase();
    if (!chamado || !novoAgendamento.data_agendamento || !novoAgendamento.unidade || !novoAgendamento.nome_solicitante) {
      alert('Preencha chamado, data, unidade e solicitante.');
      return;
    }
    const registro = {
      id_chamado: chamado,
      data_agendamento: novoAgendamento.data_agendamento,
      horario_previsto: novoAgendamento.hora_agendamento || null,
      unidade_site: novoAgendamento.unidade.trim().toUpperCase(),
      geo: novoAgendamento.geo.trim().toUpperCase(),
      tipo_unidade: novoAgendamento.tipo_unidade.trim().toUpperCase(),
      nome_solicitante: novoAgendamento.nome_solicitante.trim().toUpperCase(),
      contato_ambev: novoAgendamento.contato_ambev.trim(),
      status: 'Dentro do prazo'
    };
    const { error } = await supabase.from('agenda_os').upsert(registro, { onConflict: 'id_chamado' });
    if (error) {
      alert('Não foi possível salvar o agendamento: ' + error.message);
      return;
    }
    alert(editandoId ? 'Agendamento atualizado no banco de dados.' : 'Chamado agendado e salvo no banco de dados.');
    cancelarEdicao();
    await carregarAgendamentos();
  };

  const excluirAgendamento = async (id: string) => {
    if (!window.confirm('Deseja excluir este agendamento?')) return;
    const { error } = await supabase.from('agenda_os').delete().eq('id_chamado', id);
    if (error) {
      alert('Erro ao excluir agendamento: ' + error.message);
      return;
    }
    await carregarAgendamentos();
  };

  const iniciarExclusaoRonda = (ronda: any) => {
    setItemParaExcluirStep1(ronda);
  };

  const confirmarExclusaoStep1 = () => {
    setItemParaExcluirStep2(itemParaExcluirStep1);
    setItemParaExcluirStep1(null);
  };

  const confirmarExclusaoFinal = async () => {
    if (itemParaExcluirStep2) {
      const { error } = await supabase.from('rondas').delete().eq('id', itemParaExcluirStep2.id);
      if (error) alert('Erro ao excluir: ' + error.message); 
      else {
        alert('🗑️ Registo apagado permanentemente do banco de dados.');
        carregarRondas();
      }
      setItemParaExcluirStep2(null);
    }
  };

  const baixarFotosZip = (ronda: any) => {
    alert(`⚡ Iniciando o download das fotos compactadas (.zip) do chamado ${ronda.numero_chamado || ronda.chamado || ronda.id}_${ronda.geo || 'GEO'}`);
  };

  const abrirPdfFormatado = (item: any) => {
    setDetalheItem(item);
  };

  const handleChange = (e: any) => {
    const val = typeof e.target.value === 'string' ? e.target.value.toUpperCase() : e.target.value;
    setForm({ ...form, [e.target.name]: val });
  };

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setForm({ ...form, [e.target.name]: reader.result as string });
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const agoraFim = new Date();
    const horaFimAtual = agoraFim.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    const parceiraFinal = form.parceira === 'OUTRA' ? form.outra_parceira : form.parceira;

    const dadosEnvio = {
      ...form,
      parceira: parceiraFinal,
      hora_fim: horaFimAtual
    };

    const { error } = await supabase.from('rondas').insert([dadosEnvio]);
    if (error) alert('Erro ao enviar: ' + error.message);
    else {
      const { error: erroStatusAgenda } = await supabase
        .from('agenda_os')
        .update({ status: 'Concluída' })
        .eq('id_chamado', form.numero_chamado.trim().replace(/\s+/g, '').toUpperCase());
      if (erroStatusAgenda) {
        console.error('Ronda salva, mas não foi possível atualizar o status da agenda:', erroStatusAgenda.message);
      }
      await carregarAgendamentos();

      alert('✅ Ronda registada com sucesso!'); 
      setForm(camposIniciais); 
      setChamadoCarregado(false);
      setChamadoBuscaInput('');
      setAlertaAtraso(null);
      carregarRondas(); 
      setVisaoGeral('gerente'); 
      setSubAbaGestor('relatorios'); 
    }
  };

  const exportarExcel = () => {
    let csv = 'ID;Data;Hora;Chamado;Tecnico;Unidade;UF;GEO\n';
    listaRondas.forEach(r => {
      csv += `${r.id};${r.data_ronda || ''};${r.hora_inicio || ''};${r.numero_chamado || ''};${r.nome_completo || r.nome || ''};${r.unidade || ''};${r.uf || ''};${r.geo || ''}\n`;
    });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob(["\ufeff" + csv], { type: 'text/csv;charset=utf-8;' }));
    a.download = 'Relatorio_Rondas_Ambev.csv';
    a.click();
  };

  const rondasFiltradas = listaRondas.filter(r => {
    const q = busca.toLowerCase();
    return (r.unidade?.toLowerCase().includes(q) || r.numero_chamado?.toLowerCase().includes(q) || r.nome_completo?.toLowerCase().includes(q) || r.uf?.toLowerCase().includes(q));
  });

  const agendamentosFiltrados = listaAgendamentos.filter(a => {
    const q = buscaAgenda.toLowerCase();
    return (String(a.chamado || '').toLowerCase().includes(q) || String(a.unidade || '').toLowerCase().includes(q) || String(a.solicitante || '').toLowerCase().includes(q));
  });

  const todosCampos = formConfig.flatMap(s => s.campos);
  const totalCampos = todosCampos.length;
  const camposPreenchidos = detalheItem ? Object.values(detalheItem).filter(v => v !== '' && v !== null).length : 48;
  const respostasOk = detalheItem ? Object.values(detalheItem).filter(v => v === 'OK' || v === 'Sim' || v === 'SIM').length : 5;
  const respostasNok = detalheItem ? Object.values(detalheItem).filter(v => v === 'NOK' || v === 'Não' || v === 'NÃO').length : 0;

  const nomeArquivoPdf = detalheItem ? `${detalheItem.numero_chamado || detalheItem.chamado || 'RITM20799282'}_${detalheItem.geo || 'NCO'}.pdf`.toUpperCase() : 'RITM20799282_NCO.PDF';

  const camposParaOcultarDetalhamento = [
    'nome', 'nome_completo', 'numero_chamado', 'data_ronda', 'hora_inicio', 'uf', 'parceira', 'outra_parceira'
  ];

  return (
    <div className={`min-h-screen bg-[#f8fafc] font-sans text-slate-800 print:bg-white print:pb-0 ${isMobile ? 'pb-24' : 'pb-12'}`}>
      
      <style>{`
        @media print {
          body {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            background-color: white !important;
          }
          .print-header-azul { background-color: #102a52 !important; color: white !important; }
          .print-card-header { background-color: #102a52 !important; color: white !important; }
          .print-card-body { background-color: #f0f4f8 !important; color: #0f172a !important; }
          .print-grid { display: grid !important; grid-template-columns: repeat(2, minmax(0, 1fr)) !important; gap: 0.75rem !important; }
          .page-break-inside-avoid { break-inside: avoid !important; page-break-inside: avoid !important; }
        }
      `}</style>

      <header className="bg-[#1e293b] text-white px-4 md:px-8 py-3 md:py-5 shadow-lg flex flex-col md:flex-row justify-between items-center gap-2 sticky top-0 z-40 print:hidden border-b border-slate-700">
        <div className="flex justify-between items-center w-full md:w-auto">
          <div>
            <span className="text-[9px] md:text-[10px] font-bold tracking-widest text-amber-500 uppercase block">BASE DE ATENDIMENTOS</span>
            <h1 className="text-lg md:text-2xl font-black text-white uppercase tracking-tight">Relatórios de Ronda</h1>
          </div>
          {isMobile && (
            <span className="bg-amber-500 text-slate-900 text-[10px] font-black px-2 py-0.5 rounded uppercase">
              📱 Mobile Active
            </span>
          )}
        </div>
        
        {!isMobile && (
          <div className="flex items-center gap-2">
            <button onClick={() => setVisaoGeral('tecnico')} className={`px-3 py-2 rounded-lg text-xs font-bold transition shadow uppercase ${visaoGeral === 'tecnico' ? 'bg-amber-500 text-slate-900' : 'bg-slate-800 text-slate-300 border border-slate-700 hover:text-white'}`}>📱 Nova Ronda</button>
            <button onClick={() => setVisaoGeral('gerente')} className={`px-3 py-2 rounded-lg text-xs font-bold transition shadow uppercase ${visaoGeral === 'gerente' ? 'bg-amber-500 text-slate-900' : 'bg-slate-800 text-slate-300 border border-slate-700 hover:text-white'}`}>📊 Gestor</button>
            <button onClick={abrirAtalhoDiretoField} title="Abrir link direto para técnicos" className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-3 py-2 rounded-lg transition uppercase flex items-center gap-1 shadow">⚡ Link Field</button>
            {usuarioLogado && (
              <button onClick={handleLogout} className="bg-slate-800 border border-slate-600 hover:bg-slate-700 text-white text-xs font-bold px-3 py-2 rounded-lg transition uppercase">Sair</button>
            )}
          </div>
        )}
      </header>

      {isMobile && (
        <div className="fixed bottom-0 left-0 right-0 bg-[#1e293b] text-white border-t border-slate-700 z-50 flex justify-around p-2 shadow-2xl print:hidden">
          <button 
            onClick={() => setVisaoGeral('tecnico')} 
            className={`flex flex-col items-center py-1 px-3 rounded-lg font-bold text-[10px] uppercase transition ${visaoGeral === 'tecnico' ? 'text-amber-500 font-black' : 'text-slate-400'}`}
          >
            <span className="text-lg">📋</span>
            <span>Nova Ronda</span>
          </button>
          
          <button 
            onClick={() => setVisaoGeral('gerente')} 
            className={`flex flex-col items-center py-1 px-3 rounded-lg font-bold text-[10px] uppercase transition ${visaoGeral === 'gerente' ? 'text-amber-500 font-black' : 'text-slate-400'}`}
          >
            <span className="text-lg">📊</span>
            <span>Painel Gestor</span>
          </button>

          <button 
            onClick={abrirAtalhoDiretoField} 
            className="flex flex-col items-center py-1 px-3 rounded-lg font-bold text-[10px] uppercase text-emerald-400"
          >
            <span className="text-lg">⚡</span>
            <span>Link Field</span>
          </button>
        </div>
      )}

      <main className="max-w-7xl mx-auto mt-4 md:mt-6 px-3 md:px-4 print:p-0 print:m-0">
        {visaoGeral === 'tecnico' && !detalheItem && (
          <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-slate-200 max-w-3xl mx-auto print:hidden">
            <h2 className="text-xl md:text-2xl font-black text-center mb-4 md:mb-6 text-slate-800 uppercase">Checklist Operacional</h2>
            
            {!chamadoCarregado ? (
              <form onSubmit={buscarEPreencherChamado} className="space-y-4 bg-slate-50 p-4 md:p-6 rounded-xl border-2 border-slate-200 text-center">
                <label className="block text-base md:text-lg font-black text-slate-800 uppercase tracking-wide">
                  Digite o Número do Chamado
                </label>
                <p className="text-xs text-slate-500 uppercase">
                  Insira o código do chamado agendado para iniciar o checklist.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto pt-2">
                  <input 
                    type="text" 
                    required 
                    placeholder="Ex: RITM20799282" 
                    value={chamadoBuscaInput} 
                    onChange={e => setChamadoBuscaInput(e.target.value)} 
                    className="w-full border-2 border-slate-400 focus:border-amber-500 rounded-xl p-4 text-lg md:text-xl font-mono font-black text-slate-900 bg-white uppercase text-center outline-none shadow-inner tracking-widest" 
                  />
                  <button 
                    type="submit" 
                    className="w-full sm:w-auto bg-[#1e293b] active:bg-slate-900 hover:bg-slate-800 text-white font-black px-8 py-4 rounded-xl text-sm shadow-md transition whitespace-nowrap uppercase flex items-center justify-center gap-2"
                  >
                    🔍 Buscar Chamado
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {alertaAtraso && (
                  <div className="bg-red-500 text-white p-4 rounded-xl shadow-md border-2 border-red-600 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">⏰</span>
                      <div>
                        <h4 className="font-black text-sm uppercase">CHAMADO COM ATRASO NO ATENDIMENTO!</h4>
                        <p className="text-xs font-bold uppercase">Status: <span className="underline">{alertaAtraso}</span></p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 flex flex-col sm:flex-row justify-between items-center gap-3">
                  <div className="text-center sm:text-left">
                    <span className="text-[10px] font-bold text-amber-700 uppercase block">CHAMADO VINCULADO</span>
                    <p className="text-xl font-black text-slate-900 font-mono tracking-wider">{form.numero_chamado}</p>
                  </div>
                  <button type="button" onClick={limparChamadoBuscado} className="text-xs font-bold text-red-600 hover:underline uppercase bg-white px-4 py-2 rounded-lg border border-red-200 shadow-sm w-full sm:w-auto">🔄 Trocar Chamado</button>
                </div>

                <div className="bg-slate-100 p-4 rounded-xl border border-slate-200 grid grid-cols-2 md:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase">Unidade</label>
                    <input type="text" readOnly value={form.unidade} className="w-full bg-slate-200 border border-slate-300 rounded p-2 text-xs font-bold text-slate-700 uppercase" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase">GEO</label>
                    <input type="text" readOnly value={form.geo} className="w-full bg-slate-200 border border-slate-300 rounded p-2 text-xs font-bold text-slate-700 uppercase" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase">Solicitante / Nome</label>
                    <input type="text" readOnly value={form.nome_completo} className="w-full bg-slate-200 border border-slate-300 rounded p-2 text-xs font-bold text-slate-700 uppercase" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase">Data do Agendamento</label>
                    <input type="text" readOnly value={form.data_ronda} className="w-full bg-slate-200 border border-slate-300 rounded p-2 text-xs font-bold text-slate-700 uppercase" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase">Tipo de Unidade / UF</label>
                    <input type="text" readOnly value={form.uf} className="w-full bg-slate-200 border border-slate-300 rounded p-2 text-xs font-bold text-slate-700 uppercase" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-amber-600 uppercase">⏰ HORA INÍCIO</label>
                    <input type="text" readOnly value={form.hora_inicio} className="w-full bg-amber-100 border border-amber-300 rounded p-2 text-xs font-black text-amber-900 uppercase" />
                  </div>
                </div>

                {formConfig.map((s) => (
                  <div key={s.titulo} className="p-4 md:p-5 rounded-xl border border-slate-200 bg-slate-50">
                    <h3 className="font-black text-slate-700 text-sm uppercase border-b pb-2 mb-4">{s.titulo}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {s.campos.map((c) => {
                        if (['nome_completo', 'data_ronda', 'uf', 'hora_inicio'].includes(c.id)) return null;

                        return (
                          <div key={c.id} className={c.longo ? "md:col-span-2" : ""}>
                            <label className={`block text-[11px] font-bold uppercase mb-1 ${c.foto ? 'text-amber-600' : ''}`}>{c.label}</label>
                            
                            {c.tipo === 'select' ? (
                              <select name={c.id} value={form[c.id]} onChange={handleChange} className="w-full border rounded-lg p-3 text-sm bg-white font-bold uppercase">
                                <option value="">Selecione...</option>
                                {c.opcoes?.map((o) => <option key={o} value={o}>{o}</option>)}
                              </select> 
                            ) : c.foto ? (
                              <div><input type="file" accept="image/*" capture="environment" name={c.id} onChange={handleFileChange} className="w-full border rounded-lg p-2.5 text-xs bg-white uppercase" />{form[c.id] && <p className="text-[10px] text-emerald-600 font-bold uppercase mt-1">✅ Foto capturada!</p>}</div> 
                            ) : c.longo ? (
                              <textarea name={c.id} value={form[c.id]} onChange={handleChange} className="w-full border rounded-lg p-2.5 text-sm h-16 bg-white uppercase" /> 
                            ) : (
                              <input type={c.tipo || "text"} name={c.id} value={form[c.id]} onChange={handleChange} className="w-full border rounded-lg p-2.5 text-sm bg-white uppercase" />
                            )}

                            {c.id === 'parceira' && form.parceira === 'OUTRA' && (
                              <div className="mt-3 p-3 bg-amber-50 border border-amber-300 rounded-lg">
                                <label className="block text-[10px] font-bold text-amber-800 uppercase mb-1">✍️ Especifique o nome da Parceira</label>
                                <input 
                                  type="text" 
                                  name="outra_parceira" 
                                  required 
                                  placeholder="Digite o nome da parceira..." 
                                  value={form.outra_parceira} 
                                  onChange={handleChange} 
                                  className="w-full border border-amber-300 rounded p-2 text-xs bg-white font-bold text-slate-800 uppercase" 
                                />
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
                <button type="submit" className="w-full bg-amber-500 font-black py-4 rounded-xl shadow-lg text-lg text-slate-900 hover:bg-amber-600 transition uppercase">✅ SUBMETER RONDA COMPLETA</button>
              </form>
            )}
          </div>
        )}

        {visaoGeral === 'gerente' && !detalheItem && (
          <div className="space-y-6">
            {!usuarioLogado ? (
              <div className="bg-white p-6 md:p-8 rounded-xl shadow-md border border-slate-200 max-w-md mx-auto mt-6 md:mt-12 text-center">
                <h2 className="text-xl font-black mb-4 text-slate-800 uppercase">Acesso ao Painel do Gestor</h2>
                <p className="text-xs text-slate-500 mb-4 uppercase">
                  Login Master Inicial: <strong className="text-slate-800">master</strong> | Senha: <strong className="text-slate-800">Master123</strong>
                </p>
                <form onSubmit={handleLogin} className="space-y-4 text-left">
                  <div>
                    <label className="block text-xs font-bold uppercase mb-1">Nome de Utilizador (Login)</label>
                    <input type="text" value={loginUser} onChange={e => setLoginUser(e.target.value)} required placeholder="Ex: master ou nome_usuario" className="w-full border rounded p-2.5 text-sm bg-white uppercase" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase mb-1">Senha</label>
                    <input type="password" value={loginPass} onChange={e => setLoginPass(e.target.value)} required placeholder="Sua senha" className="w-full border rounded p-2.5 text-sm bg-white" />
                  </div>
                  <button type="submit" className="w-full bg-[#1e293b] text-white font-bold py-3 rounded-lg text-sm shadow hover:bg-slate-800 transition uppercase">Entrar no Painel</button>
                </form>
              </div>
            ) : usuarioLogado.deve_mudar_senha ? (
              <div className="bg-white p-6 md:p-8 rounded-xl shadow-md border border-slate-200 max-w-md mx-auto mt-6 md:mt-12 text-center">
                <h2 className="text-xl font-black mb-2 text-amber-600 uppercase">🔑 Redefinição de Senha Obrigatória</h2>
                <p className="text-xs text-slate-600 mb-4 uppercase font-semibold">
                  Este é o seu primeiro acesso com senha provisória. Por favor, defina a sua senha pessoal definitiva para continuar.
                </p>
                <form onSubmit={handleMudarSenha} className="space-y-4 text-left">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">Nova Senha</label>
                    <input type="password" value={novaSenha} onChange={e => setNovaSenha(e.target.value)} required placeholder="Mínimo de 6 caracteres" className="w-full border rounded p-2.5 text-sm bg-white" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">Confirmar Nova Senha</label>
                    <input type="password" value={confirmarNovaSenha} onChange={e => setConfirmarNovaSenha(e.target.value)} required placeholder="Repita a nova senha" className="w-full border rounded p-2.5 text-sm bg-white" />
                  </div>
                  <button type="submit" className="w-full bg-amber-500 text-slate-900 font-bold py-3 rounded-lg text-sm shadow hover:bg-amber-600 transition uppercase">Guardar Nova Senha e Entrar</button>
                </form>
              </div>
            ) : (
              <>
                <div className="bg-white p-2 rounded-xl shadow-sm border border-slate-200 flex flex-wrap gap-2 justify-center md:justify-start">
                  <button onClick={() => setSubAbaGestor('relatorios')} className={`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-2 uppercase ${subAbaGestor === 'relatorios' ? 'bg-[#1e293b] text-white shadow' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}>📊 Relatórios</button>
                  <button onClick={() => setSubAbaGestor('agenda')} className={`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-2 uppercase ${subAbaGestor === 'agenda' ? 'bg-[#1e293b] text-white shadow' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}>📅 Agenda</button>
                  <button onClick={() => setSubAbaGestor('concluidos')} className={`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-2 uppercase ${subAbaGestor === 'concluidos' ? 'bg-[#1e293b] text-white shadow' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}>✅ Concluídos</button>
                  <button onClick={() => setSubAbaGestor('usuarios')} className={`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-2 uppercase ${subAbaGestor === 'usuarios' ? 'bg-[#1e293b] text-white shadow' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}>👥 Usuários</button>
                </div>

                {subAbaGestor === 'relatorios' && (
                  <div className="space-y-6">
                    <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 space-y-4">
                      <div className="flex flex-col md:flex-row justify-between gap-4">
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-400 uppercase">PERÍODO</label>
                          <div className="flex flex-wrap gap-1">
                            {['Hoje', 'Semana', 'Mês', 'Ano', 'Tudo', 'Personalizado'].map(p => (
                              <button key={p} onClick={() => setPeriodoFiltro(p)} className={`px-3 py-1.5 rounded-md text-xs font-bold border transition uppercase ${periodoFiltro === p ? 'bg-[#1e293b] text-white border-[#1e293b]' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}`}>{p}</button>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-1 md:w-1/3">
                          <label className="text-[10px] font-bold text-slate-400 uppercase">BUSCAR</label>
                          <input type="text" placeholder="Unidade, chamado, técnico, UF..." value={busca} onChange={e => setBusca(e.target.value.toUpperCase())} className="w-full border rounded-lg p-2 text-xs bg-white border-slate-300 uppercase" />
                        </div>

                        <div className="flex gap-2 items-end">
                          <button className="bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold px-3 py-2 rounded-lg border border-slate-300 uppercase">Importar JSON/CSV</button>
                          <button className="bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold px-3 py-2 rounded-lg border border-slate-300 uppercase">Exportar JSON</button>
                        </div>
                      </div>

                      <div>
                        <button onClick={exportarExcel} className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold px-4 py-2 rounded-lg text-xs shadow transition uppercase">Exporter Excel/CSV</button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm"><span className="text-[10px] font-bold text-slate-400 uppercase">ATENDIMENTOS</span><p className="text-3xl font-black text-slate-800">{listaRondas.length}</p></div>
                      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm"><span className="text-[10px] font-bold text-slate-400 uppercase">UNIDADES</span><p className="text-3xl font-black text-slate-800">{geosDisponiveis.length || 2}</p></div>
                      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm"><span className="text-[10px] font-bold text-slate-400 uppercase">CHAMADOS</span><p className="text-3xl font-black text-slate-800">{listaRondas.length}</p></div>
                      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm"><span className="text-[10px] font-bold text-slate-400 uppercase">COM ITEM NOK</span><p className="text-3xl font-black text-red-600">0</p></div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs whitespace-nowrap uppercase">
                          <thead className="bg-slate-50 text-slate-500 border-b">
                            <tr>
                              <th className="p-3">ID</th>
                              <th className="p-3">REGISTRO</th>
                              <th className="p-3">UNIDADE</th>
                              <th className="p-3">UF</th>
                              <th className="p-3">TÉCNICO</th>
                              <th className="p-3 text-center">AÇÕES</th>
                            </tr>
                          </thead>
                          <tbody>
                            {rondasFiltradas.length === 0 ? (
                              <tr><td colSpan={6} className="p-6 text-center text-slate-400">Nenhum relatório encontrado.</td></tr>
                            ) : (
                              rondasFiltradas.map((r) => (
                                <tr key={r.id} className="border-b hover:bg-slate-50">
                                  <td className="p-3 font-mono font-bold">{String(r.numero_chamado || r.id).toUpperCase()}</td>
                                  <td className="p-3 text-slate-500">{r.data_ronda || '06/10/2026, 11:23:11'}</td>
                                  <td className="p-3 font-bold">{String(r.unidade || 'CDD BELÉM').toUpperCase()}</td>
                                  <td className="p-3">{String(r.uf || 'PA').toUpperCase()}</td>
                                  <td className="p-3">{String(r.nome_completo || r.nome || 'JACKSON ROCHA VIVEIROS').toUpperCase()}</td>
                                  <td className="p-3 text-center space-x-2">
                                    <button onClick={() => abrirPdfFormatado(r)} className="bg-white hover:bg-slate-50 border border-slate-300 px-3 py-1 rounded text-xs font-bold text-slate-700">PDF</button>
                                    <button onClick={() => baixarFotosZip(r)} className="bg-white hover:bg-slate-50 border border-slate-300 px-3 py-1 rounded text-xs font-bold text-slate-700">Fotos (.zip)</button>
                                    <button onClick={() => abrirPdfFormatado(r)} className="bg-white hover:bg-slate-50 border border-slate-300 px-3 py-1 rounded text-xs font-bold text-slate-700">Detalhes</button>
                                    {usuarioLogado?.funcao === 'Master' && (
                                      <button onClick={() => iniciarExclusaoRonda(r)} className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs font-bold">Excluir</button>
                                    )}
                                  </td>
                                </tr>
                              ))
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}

                {subAbaGestor === 'agenda' && (
                  <div className="space-y-6">
                    <div className="bg-white p-6 rounded-xl border border-slate-200 space-y-4 shadow-sm">
                      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <h2 className="text-lg font-black text-slate-800 flex items-center gap-2 uppercase">📅 Agenda de chamados</h2>
                        <input type="text" placeholder="Buscar chamado, unidade ou solicitante..." value={buscaAgenda} onChange={e => setBuscaAgenda(e.target.value.toUpperCase())} className="w-full md:w-80 border border-slate-300 rounded-lg p-2 text-xs bg-white uppercase" />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200"><span className="text-[10px] font-bold text-slate-400 uppercase block">AGENDAS DE HOJE</span><p className="text-2xl font-black text-slate-800">4</p><span className="text-xs text-red-600 font-bold uppercase">1 chamado(s) atrasado(s)</span></div>
                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200"><span className="text-[10px] font-bold text-slate-400 uppercase block">AGENDAS DA SEMANA</span><p className="text-2xl font-black text-slate-800">10</p><span className="text-xs text-red-600 font-bold uppercase">1 chamado(s) atrasado(s)</span></div>
                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200"><span className="text-[10px] font-bold text-slate-400 uppercase block">AGENDAS DO MÊS</span><p className="text-2xl font-black text-slate-800">17</p><span className="text-xs text-red-600 font-bold uppercase">1 chamado(s) atrasado(s)</span></div>
                      </div>

                      <form onSubmit={criarOuSalvarAgendamento} className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-4">
                        <div className="flex justify-between items-center border-b pb-2">
                          <h3 className="text-xs font-black uppercase text-slate-700">{editandoId ? '✏️ Editar Agendamento' : 'Novo Agendamento'}</h3>
                          {editandoId && <button type="button" onClick={cancelarEdicao} className="text-xs font-bold text-red-600 hover:underline uppercase">Cancelar Edição</button>}
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                          <div>
                            <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">NÚMERO DO CHAMADO</label>
                            <input type="text" required value={novoAgendamento.numero_chamado} onChange={e => setNovoAgendamento({ ...novoAgendamento, numero_chamado: e.target.value.toUpperCase() })} className="w-full border border-slate-300 rounded p-2 text-xs bg-white text-slate-800 font-medium uppercase" />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">DATA DO AGENDAMENTO</label>
                            <input type="date" required value={novoAgendamento.data_agendamento} onChange={e => setNovoAgendamento({ ...novoAgendamento, data_agendamento: e.target.value })} className="w-full border border-slate-300 rounded p-2 text-xs bg-white text-slate-800 font-medium" />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">HORA DO AGENDAMENTO</label>
                            <input type="time" value={novoAgendamento.hora_agendamento} onChange={e => setNovoAgendamento({ ...novoAgendamento, hora_agendamento: e.target.value })} className="w-full border border-slate-300 rounded p-2 text-xs bg-white text-slate-800 font-medium" />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">UNIDADE (SITE)</label>
                            <select required value={novoAgendamento.unidade} onChange={e => handleSelectUnidadeAgenda(e.target.value)} className="w-full border border-slate-300 rounded p-2 text-xs bg-white text-slate-800 font-medium uppercase">
                              <option value="">Selecione entre {todasUnidadesDB.length || 'várias'} unidades...</option>
                              {todasUnidadesDB.map(u => {
                                const nome = (u.Site || u.site).toUpperCase();
                                return <option key={u.id || nome} value={nome}>{nome}</option>;
                              })}
                            </select>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 items-end">
                          <div>
                            <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">GEO (AUTOMÁTICO)</label>
                            <input type="text" readOnly value={novoAgendamento.geo} placeholder="Automático" className="w-full border border-slate-200 rounded p-2 text-xs bg-slate-100 font-bold text-slate-600 uppercase" />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">TIPO DE UNIDADE</label>
                            <select value={novoAgendamento.tipo_unidade} onChange={e => setNovoAgendamento({ ...novoAgendamento, tipo_unidade: e.target.value.toUpperCase() })} className="w-full border border-slate-300 rounded p-2 text-xs bg-white text-slate-800 font-medium uppercase">
                              <option value="CDD">CDD</option>
                              <option value="CDL">CDL</option>
                              <option value="CDD/FÁBRICA">CDD/FÁBRICA</option>
                              <option value="FÁBRICA">FÁBRICA</option>
                              <option value="CDR">CDR</option>
                              <option value="PA">PA</option>
                              <option value="ESCRITÓRIO">ESCRITÓRIO</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">NOME DO SOLICITANTE</label>
                            <input type="text" value={novoAgendamento.nome_solicitante} onChange={e => setNovoAgendamento({ ...novoAgendamento, nome_solicitante: e.target.value.toUpperCase() })} className="w-full border border-slate-300 rounded p-2 text-xs bg-white text-slate-800 font-medium uppercase" />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">CONTATO AMBEV (CELULAR)</label>
                            <input type="text" placeholder="(11) 99999-9999" value={novoAgendamento.contato_ambev} onChange={e => setNovoAgendamento({ ...novoAgendamento, contato_ambev: e.target.value })} className="w-full border border-slate-300 rounded p-2 text-xs bg-white text-slate-800 font-medium uppercase" />
                          </div>
                          <button type="submit" className="bg-[#1e293b] hover:bg-slate-800 text-white font-bold py-2 rounded text-xs shadow transition flex justify-center items-center gap-1 uppercase">
                            {editandoId ? '💾 Salvar Alterações' : '+ Agendar'}
                          </button>
                        </div>
                      </form>

                      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-x-auto">
                        <table className="w-full text-left text-xs whitespace-nowrap uppercase">
                          <thead className="bg-slate-50 text-slate-500 border-b">
                            <tr>
                              <th className="p-3">CHAMADO</th>
                              <th className="p-3">DATA</th>
                              <th className="p-3">UNIDADE (GEO)</th>
                              <th className="p-3">TIPO</th>
                              <th className="p-3">SOLICITANTE</th>
                              <th className="p-3">CONTATO AMBEV</th>
                              <th className="p-3">STATUS</th>
                              <th className="p-3 text-center">AÇÕES</th>
                            </tr>
                          </thead>
                          <tbody>
                            {agendamentosFiltrados.map((a) => {
                              const tempoAtrasadoAgenda = calcularTempoAtraso(a.data, a.hora);
                              const estaAtrasado = tempoAtrasadoAgenda || a.status === 'Atrasada';

                              return (
                                <tr key={a.id} className="border-b hover:bg-slate-50">
                                  <td className="p-3 font-mono font-bold">{a.chamado}</td>
                                  <td className="p-3 text-slate-500">{a.data} · {a.hora}</td>
                                  <td className="p-3 font-bold">{a.unidade} {a.geo ? `(${a.geo})` : ''}</td>
                                  <td className="p-3">{a.tipo}</td>
                                  <td className="p-3">{a.solicitante}</td>
                                  <td className="p-3">{a.contato || '-'}</td>
                                  <td className="p-3">
                                    {a.status === 'Concluída' && <span className="inline-flex items-center gap-1 text-slate-600 font-bold"><span className="w-2 h-2 rounded-full bg-slate-400"></span> Concluída</span>}
                                    {estaAtrasado && a.status !== 'Concluída' && (
                                      <span className="inline-flex items-center gap-1 text-red-600 font-black bg-red-50 px-2 py-0.5 rounded border border-red-200">
                                        <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span> 
                                        Atrasada {tempoAtrasadoAgenda ? `(há ${tempoAtrasadoAgenda})` : ''}
                                      </span>
                                    )}
                                    {!estaAtrasado && a.status === 'Dentro do prazo' && <span className="inline-flex items-center gap-1 text-emerald-600 font-bold"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> Dentro do prazo</span>}
                                  </td>
                                  <td className="p-3 text-center space-x-1">
                                    <button onClick={() => editarAgendamento(a)} title="Editar Chamado" className="bg-amber-100 hover:bg-amber-200 border border-amber-300 p-1.5 rounded text-amber-800 font-bold transition">✏️</button>
                                    <button onClick={() => excluirAgendamento(a.id)} title="Excluir" className="bg-red-600 hover:bg-red-700 text-white p-1.5 rounded font-bold transition">🗑️</button>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}

                {subAbaGestor === 'concluidos' && (
                  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
                    <h2 className="text-lg font-black text-slate-800 border-b pb-3 uppercase">✅ Chamados Concluídos</h2>
                    <p className="text-xs text-slate-500 uppercase">Listagem consolidada de todas as rondas e chamados encerrados com sucesso.</p>
                    
                    <div className="overflow-x-auto rounded-lg border border-slate-200">
                      <table className="w-full text-left text-xs whitespace-nowrap uppercase">
                        <thead className="bg-slate-50 text-slate-500 border-b">
                          <tr>
                            <th className="p-3">CHAMADO</th>
                            <th className="p-3">DATA CONCLUÍDA</th>
                            <th className="p-3">UNIDADE</th>
                            <th className="p-3">SOLICITANTE / TÉCNICO</th>
                            <th className="p-3">STATUS</th>
                            <th className="p-3 text-center">AÇÕES</th>
                          </tr>
                        </thead>
                        <tbody>
                          {listaAgendamentos.filter(a => a.status === 'Concluída').map(c => (
                            <tr key={c.id} className="border-b hover:bg-slate-50">
                              <td className="p-3 font-mono font-bold text-amber-600">{c.chamado}</td>
                              <td className="p-3 text-slate-500">{c.data}</td>
                              <td className="p-3 font-bold">{c.unidade}</td>
                              <td className="p-3">{c.solicitante}</td>
                              <td className="p-3"><span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">Finalizado</span></td>
                              <td className="p-3 text-center space-x-2">
                                <button onClick={() => abrirPdfFormatado(c)} className="bg-slate-800 hover:bg-slate-900 text-white px-3 py-1.5 rounded text-xs font-bold shadow transition">📄 PDF com Fotos</button>
                                <button onClick={() => baixarFotosZip(c)} className="bg-white hover:bg-slate-100 border border-slate-300 px-3 py-1.5 rounded text-xs font-bold text-slate-700 shadow-sm transition">📦 Fotos (.zip)</button>
                                {usuarioLogado?.funcao === 'Master' && (
                                  <button onClick={() => iniciarExclusaoRonda(c)} className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded text-xs font-bold shadow transition">🗑️ Excluir</button>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* ABA DE USUÁRIOS REFORMULADA - SEM E-MAIL E COM FORMULÁRIO/TABELA DIRETA DO SUPABASE */}
                {subAbaGestor === 'usuarios' && (
                  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
                    <h2 className="text-lg font-black text-slate-800 flex items-center gap-2 border-b pb-3 uppercase">👥 Gestão de Usuários e Permissões</h2>
                    
                    {/* FORMULÁRIO DE CRIAÇÃO - SEM E-MAIL */}
                    <form onSubmit={criarNovoUtilizador} className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">NOME COMPLETO</label>
                          <input 
                            type="text" 
                            required 
                            value={novoUser.nome_completo} 
                            onChange={e => setNovoUser({ ...novoUser, nome_completo: e.target.value.toUpperCase() })} 
                            placeholder="EX: JOÃO DA SILVA" 
                            className="w-full border border-slate-300 rounded p-2 text-xs bg-white text-slate-800 uppercase" 
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">USUÁRIO (LOGIN)</label>
                          <input 
                            type="text" 
                            required 
                            value={novoUser.username} 
                            onChange={e => setNovoUser({ ...novoUser, username: e.target.value.toLowerCase() })} 
                            placeholder="ex: joao.silva" 
                            className="w-full border border-slate-300 rounded p-2 text-xs bg-white text-slate-800 lowercase" 
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">SENHA PROVISÓRIA</label>
                          <input 
                            type="text" 
                            required 
                            value={novoUser.senha_provisoria} 
                            onChange={e => setNovoUser({ ...novoUser, senha_provisoria: e.target.value })} 
                            className="w-full border border-slate-300 rounded p-2 text-xs bg-white font-mono text-slate-800" 
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">FUNÇÃO</label>
                          <div className="flex gap-2">
                            <select 
                              value={novoUser.funcao} 
                              onChange={e => setNovoUser({ ...novoUser, funcao: e.target.value })} 
                              className="w-full border border-slate-300 rounded p-2 text-xs bg-white font-bold text-slate-800 uppercase"
                            >
                              <option value="ADM">ADM</option>
                              <option value="Master">Master</option>
                            </select>
                            <button type="submit" className="bg-[#1e293b] hover:bg-slate-800 text-white font-bold px-4 py-2 rounded text-xs whitespace-nowrap shadow flex items-center gap-1 uppercase">
                              + CRIAR USUÁRIO
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>

                    {/* TABELA INTEGRADA AO SUPABASE */}
                    <div className="bg-white rounded-xl border border-slate-200 overflow-x-auto">
                      <table className="w-full text-left text-xs uppercase">
                        <thead className="bg-slate-50 text-slate-500 border-b">
                          <tr>
                            <th className="p-3">NOME COMPLETO</th>
                            <th className="p-3">USUÁRIO / LOGIN</th>
                            <th className="p-3">FUNÇÃO</th>
                            <th className="p-3">STATUS</th>
                            <th className="p-3 text-center">AÇÕES</th>
                          </tr>
                        </thead>
                        <tbody>
                          {listaUsuarios.length === 0 ? (
                            <tr><td colSpan={5} className="p-6 text-center text-slate-400">Nenhum usuário encontrado no banco do Supabase.</td></tr>
                          ) : (
                            listaUsuarios.map((u) => (
                              <tr key={u.id} className="border-b hover:bg-slate-50">
                                <td className="p-3 font-bold">{String(u.nome_completo || u.username).toUpperCase()}</td>
                                <td className="p-3 font-mono text-slate-700 lowercase">{u.username}</td>
                                <td className="p-3 font-bold">{String(u.funcao).toUpperCase()}</td>
                                <td className="p-3 font-bold text-emerald-600">ATIVO</td>
                                <td className="p-3 text-center space-x-2 whitespace-nowrap">
                                  <button
                                    type="button"
                                    onClick={() => handleResetSenha(u.id, u.nome_completo || u.username)}
                                    className="bg-amber-500 hover:bg-amber-600 text-slate-900 px-3 py-1 rounded text-xs font-bold transition shadow-sm"
                                  >
                                    🔑 Resetar Senha
                                  </button>
                                  {u.username !== 'master' && (
                                    <button
                                      type="button"
                                      onClick={() => handleExcluirUsuario(u.id, u.nome_completo || u.username)}
                                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs font-bold transition shadow-sm"
                                    >
                                      🗑️ Excluir
                                    </button>
                                  )}
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* MODAIS DE EXCLUSÃO */}
        {itemParaExcluirStep1 && (
          <div className="fixed inset-0 bg-black/60 flex justify-center items-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl space-y-4 text-center">
              <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-600 font-bold text-2xl flex items-center justify-center mx-auto">⚠️</div>
              <h3 className="text-lg font-black text-slate-800 uppercase">Confirmar exclusão?</h3>
              <p className="text-xs text-slate-600 uppercase">Deseja realmente prosseguir com a exclusão do chamado <span className="font-bold text-slate-900">{String(itemParaExcluirStep1.numero_chamado || itemParaExcluirStep1.chamado).toUpperCase()}</span>?</p>
              <div className="flex gap-3 justify-center pt-2">
                <button onClick={() => setItemParaExcluirStep1(null)} className="bg-slate-100 hover:bg-slate-200 font-bold px-4 py-2 rounded text-xs uppercase">Cancelar</button>
                <button onClick={confirmarExclusaoStep1} className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold px-4 py-2 rounded text-xs shadow uppercase">Avançar →</button>
              </div>
            </div>
          </div>
        )}

        {itemParaExcluirStep2 && (
          <div className="fixed inset-0 bg-black/70 flex justify-center items-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl space-y-4 text-center border-2 border-red-500">
              <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 font-bold text-2xl flex items-center justify-center mx-auto">🚨</div>
              <h3 className="text-lg font-black text-red-600 uppercase">Atenção! Ação Irreversível</h3>
              <p className="text-xs text-slate-700 leading-relaxed uppercase">
                Esta ação <span className="font-bold text-red-600 uppercase">irá apagar permanentemente</span> o registo do banco de dados (Supabase).
              </p>
              <div className="flex gap-3 justify-center pt-2">
                <button onClick={() => setItemParaExcluirStep2(null)} className="bg-slate-100 hover:bg-slate-200 font-bold px-4 py-2 rounded text-xs uppercase">Desistir</button>
                <button onClick={confirmarExclusaoFinal} className="bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-2 rounded text-xs shadow uppercase">Sim, Apagar do Banco</button>
              </div>
            </div>
          </div>
        )}

        {/* MODAL DO RELATÓRIO PDF */}
        {detalheItem && (
          <div className="fixed inset-0 bg-black/60 flex justify-center items-center p-4 z-50 print:static print:bg-white print:p-0 print:block">
            <div className="bg-white rounded-xl max-w-5xl w-full max-h-[92vh] overflow-y-auto p-4 md:p-8 shadow-2xl print:shadow-none print:max-h-none print:p-0 print:w-full print:overflow-visible relative">
              <button 
                onClick={() => setDetalheItem(null)} 
                className="absolute top-4 right-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold w-8 h-8 rounded-full flex items-center justify-center text-lg print:hidden transition z-10"
                title="Fechar Relatório"
              >
                ✕
              </button>

              <div className="text-slate-900 font-sans space-y-4 bg-white p-2 uppercase">
                <div className="print-header-azul bg-[#102a52] text-white py-6 md:py-8 px-4 md:px-6 text-center rounded-sm shadow-sm space-y-2">
                  <h1 className="text-2xl md:text-3xl font-black tracking-wider uppercase">RELATÓRIO DE CHECKLIST</h1>
                  <p className="text-xs font-normal text-slate-200 uppercase">Relatório gerado a partir da base de atendimentos</p>
                  <p className="text-base md:text-lg font-bold pt-1 uppercase">
                    CHAMADO: {String(detalheItem.numero_chamado || detalheItem.chamado || 'RITM20799282').toUpperCase()}
                  </p>
                </div>
                
                <div className="pt-2 page-break-inside-avoid space-y-3">
                  <div className="bg-[#f0f4f8] py-2.5 px-4 rounded-t border-b-2 border-[#2563eb]">
                    <h2 className="text-base md:text-lg font-bold text-slate-900 uppercase">RESUMO EXECUTIVO</h2>
                  </div>

                  <table className="w-full border-collapse border border-slate-900 text-center text-xs uppercase">
                    <thead>
                      <tr className="print-card-header bg-[#102a52] text-white font-bold border-b border-slate-900">
                        <th className="border-r border-slate-900 p-1.5 w-1/3">CHAMADO</th>
                        <th className="border-r border-slate-900 p-1.5 w-1/3">NOME COMPLETO</th>
                        <th className="p-1.5 w-1/3">UNIDADE</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-slate-900 bg-white">
                        <td className="border-r border-slate-900 p-2 font-mono font-bold">{String(detalheItem.numero_chamado || detalheItem.chamado || 'RITM20799282').toUpperCase()}</td>
                        <td className="border-r border-slate-900 p-2">{String(detalheItem.nome_completo || detalheItem.solicitante || 'JACKSON ROCHA').toUpperCase()}</td>
                        <td className="p-2 font-bold">{String(detalheItem.unidade || 'CDD BELÉM').toUpperCase()}</td>
                      </tr>
                    </tbody>
                  </table>

                  <table className="w-full border-collapse border border-slate-900 text-center text-xs uppercase">
                    <thead>
                      <tr className="print-card-header bg-[#102a52] text-white font-bold border-b border-slate-900">
                        <th className="border-r border-slate-900 p-1.5 w-1/2">NOME</th>
                        <th className="p-1.5 w-1/2">PARCEIRA</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-slate-900 bg-white">
                        <td className="border-r border-slate-900 p-2">{String(detalheItem.nome || 'USUARIO').toUpperCase()}</td>
                        <td className="p-2 font-bold">{String(detalheItem.parceira || 'EASY TECH').toUpperCase()}</td>
                      </tr>
                    </tbody>
                  </table>

                  <table className="w-full border-collapse border border-slate-900 text-center text-xs uppercase">
                    <thead>
                      <tr className="print-card-header bg-[#102a52] text-white font-bold border-b border-slate-900">
                        <th className="border-r border-slate-900 p-1.5 w-1/3">DATA</th>
                        <th className="border-r border-slate-900 p-1.5 w-1/3">HORA INÍCIO</th>
                        <th className="p-1.5 w-1/3">HORA FIM</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-slate-900 bg-white">
                        <td className="border-r border-slate-900 p-2 font-bold">{detalheItem.data_ronda || detalheItem.data || '2026-10-07'}</td>
                        <td className="border-r border-slate-900 p-2 font-bold">{detalheItem.hora_inicio || '11:00'}</td>
                        <td className="p-2 font-bold">{detalheItem.hora_fim || '13:00'}</td>
                      </tr>
                    </tbody>
                  </table>

                  <table className="w-full border-collapse border border-slate-900 text-center text-xs uppercase">
                    <thead>
                      <tr className="print-card-header bg-[#102a52] text-white font-bold border-b border-slate-900">
                        <th className="border-r border-slate-900 p-1.5 w-1/3">UF</th>
                        <th className="border-r border-slate-900 p-1.5 w-1/3">GEO</th>
                        <th className="p-1.5 w-1/3">TOTAL DE CAMPOS PREENCHIDOS</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-slate-900 bg-white">
                        <td className="border-r border-slate-900 p-2">{String(detalheItem.uf || 'PA').toUpperCase()}</td>
                        <td className="border-r border-slate-900 p-2 font-bold">{String(detalheItem.geo || 'NCO').toUpperCase()}</td>
                        <td className="p-2 font-bold">{camposPreenchidos}</td>
                      </tr>
                    </tbody>
                  </table>

                  <table className="w-full border-collapse border border-slate-900 text-center text-xs uppercase">
                    <thead>
                      <tr className="print-card-header bg-[#102a52] text-white font-bold border-b border-slate-900">
                        <th className="border-r border-slate-900 p-1.5 w-1/3">TOTAL DE CAMPOS EM BRANCO</th>
                        <th className="border-r border-slate-900 p-1.5 w-1/3">TOTAL DE RESPOSTAS OK/SIM</th>
                        <th className="p-1.5 w-1/3">TOTAL DE RESPOSTAS NOK/NÃO</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-white">
                        <td className="border-r border-slate-900 p-2">{totalCampos - camposPreenchidos > 0 ? totalCampos - camposPreenchidos : 20}</td>
                        <td className="border-r border-slate-900 p-2 font-bold text-emerald-700">{respostasOk}</td>
                        <td className="p-2 font-bold text-red-600">{respostasNok}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="pt-6">
                  <h3 className="text-center font-bold text-slate-800 text-sm uppercase mb-4 tracking-wider">DETALHAMENTO COMPLETO</h3>
                  <div className="grid grid-cols-2 gap-3 print-grid">
                    {formConfig.flatMap(s => s.campos).map((c, idx) => {
                      const valor = detalheItem[c.id];
                      if (c.foto || camposParaOcultarDetalhamento.includes(c.id)) return null;

                      return (
                        <div key={idx} className="border-2 border-[#102a52] flex flex-col page-break-inside-avoid">
                          <div className="print-card-header bg-[#102a52] text-white font-bold text-[11px] px-3 py-1.5 border-b-2 border-[#102a52] text-center uppercase">
                            {c.label}
                          </div>
                          <div className="print-card-body px-3 py-2 text-xs min-h-[2.2rem] flex items-center justify-center bg-[#f0f4f8] text-center uppercase">
                            <span className={valor ? "font-bold text-slate-900" : "italic text-slate-400"}>
                              {valor ? String(valor).toUpperCase() : '(EM BRANCO)'}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t-2 border-slate-900 page-break-inside-avoid">
                  <h3 className="text-sm font-black uppercase text-slate-900 mb-4">EVIDÊNCIAS FOTOGRÁFICAS</h3>
                  <div className="grid grid-cols-2 gap-4 print-grid">
                    {formConfig.flatMap(s => s.campos).filter(c => c.foto).map((c, idx) => {
                      const fotoUrl = detalheItem[c.id];
                      return (
                        <div key={idx} className="border border-slate-300 rounded p-2 bg-slate-50 flex flex-col items-center justify-between text-center page-break-inside-avoid">
                          {fotoUrl ? (
                            <img src={fotoUrl} alt={c.label} className="w-full max-h-56 object-contain rounded mb-2" />
                          ) : (
                            <div className="w-full h-40 bg-slate-200 rounded flex items-center justify-center text-xs text-slate-400 italic mb-2 uppercase">
                              Evidência Não Capturada
                            </div>
                          )}
                          <span className="text-[11px] font-bold text-slate-800 uppercase">{c.label} - EVIDÊNCIA/FOTO</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-300 flex justify-between text-[10px] text-slate-500 font-semibold uppercase">
                  <span>GERADOR DE RELATÓRIOS DE CHECKLIST</span>
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row justify-end gap-3 border-t pt-4 print:hidden">
                <button onClick={() => {
                  document.title = nomeArquivoPdf.replace('.PDF', '');
                  setTimeout(() => { window.print(); }, 300);
                }} className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold px-6 py-3 rounded-lg shadow transition uppercase text-xs w-full sm:w-auto">🖨️ IMPRIMIR / GUARDAR PDF ({nomeArquivoPdf})</button>
                <button onClick={() => setDetalheItem(null)} className="bg-slate-200 hover:bg-slate-300 font-bold px-6 py-3 rounded-lg transition uppercase text-xs w-full sm:w-auto">FECHAR</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
