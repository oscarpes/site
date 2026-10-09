# Como subir o site na Hostinger

Guia passo a passo pra publicar `oscarpes.com.br` usando o painel da Hostinger. Sem CLI, sem FTP — tudo pelo File Manager web.

## 1. Antes de subir, teste local

Antes de qualquer coisa, abra o site no seu Mac pra confirmar que tá tudo certo:

1. No Finder, navega até `/Users/joaocarpes/SoloApp/site/`.
2. Clica duas vezes em `index.html` — abre no Chrome/Safari.
3. Navega pelo menu (Análise de Solo, Consultoria, Adubos, App, Sobre, Contato) e confirma que todas as páginas carregam, o WhatsApp flutuante aparece, o menu mobile funciona (estreita a janela do navegador pra testar).

Se algo estiver estranho, me avisa antes de subir.

## 2. Faz backup do site antigo (opcional mas recomendado)

1. Entra no painel Hostinger → **Hospedagem** → **Gerenciar** no domínio `oscarpes.com.br`.
2. Vai em **Arquivos** → **Gerenciador de Arquivos** (File Manager).
3. Entra na pasta `public_html/`.
4. Seleciona TODOS os arquivos e pastas atuais → clica com botão direito → **Compactar** → escolhe `.zip` → nomeia `backup-site-antigo-$(date +%Y%m%d).zip`.
5. Baixa o zip pro teu computador (pra ter cópia segura).
6. Confirmado o backup, **deleta tudo** dentro de `public_html/` (menos o zip do backup, se quiser deixar lá).

## 3. Sobe os arquivos novos

### Opção A — Subir tudo de uma vez (mais simples)

1. No Finder, abre `/Users/joaocarpes/SoloApp/site/` e seleciona TODO o conteúdo:
   - 7 arquivos HTML (`index.html`, `analise-solo.html`, `consultoria.html`, `adubos.html`, `app.html`, `sobre.html`, `contato.html`)
   - `sitemap.xml`
   - `robots.txt`
   - Pasta `css/`
   - Pasta `js/`
   - Pasta `img/`
2. Clica com botão direito → **Compactar 11 itens** → vai gerar `Archive.zip` (renomeia pra `oscarpes-site.zip` se preferir).
3. No File Manager da Hostinger, dentro de `public_html/`, clica no botão **Upload** (ícone de seta pra cima) → seleciona `oscarpes-site.zip`.
4. Espera o upload terminar.
5. Clica com botão direito no `.zip` no File Manager → **Extrair** → confirma extração na pasta `public_html/`.
6. Apaga o `.zip` depois de extraído.

### Opção B — Subir arquivo por arquivo (controle maior)

1. Sobe primeiro os 7 HTMLs + `sitemap.xml` + `robots.txt` direto na raiz `public_html/`.
2. Cria as pastas `css/`, `js/`, `img/` no File Manager (botão "+" → New Folder).
3. Entra em cada pasta e sobe os arquivos correspondentes:
   - `css/style.css`
   - `js/main.js`
   - `img/oscarpes-logo.png`

## 4. Estrutura esperada no servidor

Depois de subir, a `public_html/` da Hostinger deve estar assim:

```
public_html/
├── index.html
├── analise-solo.html
├── consultoria.html
├── adubos.html
├── app.html
├── sobre.html
├── contato.html
├── sitemap.xml
├── robots.txt
├── css/
│   └── style.css
├── js/
│   └── main.js
└── img/
    └── oscarpes-logo.png
```

## 5. Configura o domínio principal (geralmente já está pronto)

Na Hostinger, o domínio comprado já aponta direto pra `public_html/` por padrão. Se você comprou `oscarpes.com.br` na própria Hostinger ou apontou os DNS pra ela, **não precisa fazer nada** nesse passo.

Pra confirmar:
1. Painel Hostinger → **Domínios** → ver se `oscarpes.com.br` está com status "Ativo".
2. Em **DNS / Nameservers**, deve estar apontando pros nameservers da Hostinger (`ns1.dns-parking.com`, `ns2.dns-parking.com`) ou os personalizados que você configurou.

## 6. Testa em produção

1. Abre `https://www.oscarpes.com.br` no navegador (use aba anônima pra evitar cache).
2. Confere:
   - [ ] Home carrega
   - [ ] Logo aparece
   - [ ] Menu funciona (clicar em cada item)
   - [ ] WhatsApp flutuante abre o app de WhatsApp ao clicar
   - [ ] Mobile (abre no celular ou usa modo responsivo do Chrome) funciona
   - [ ] Formulário de contato abre o cliente de email
3. Testa cada página individualmente: `www.oscarpes.com.br/analise-solo.html`, `/consultoria.html`, etc.

## 7. SSL (HTTPS)

A Hostinger geralmente ativa SSL grátis (Let's Encrypt) automaticamente. Se ainda estiver em HTTP:

1. Painel Hostinger → **SSL** → ativar pro domínio principal.
2. Aguarda alguns minutos pra propagar.
3. Confirma `https://www.oscarpes.com.br` (com cadeado verde).

## 8. SEO — Submeter ao Google

Quando o site estiver no ar e em HTTPS:

1. Acessa https://search.google.com/search-console
2. Adiciona a propriedade `https://www.oscarpes.com.br` (o host oficial — o apex `oscarpes.com.br` só redireciona pra cá)
3. Confirma a posse (geralmente baixa um arquivo HTML que você sobe pro `public_html/` e depois clica "Verificar").
4. Submete o sitemap: na barra lateral → **Sitemaps** → cola `https://www.oscarpes.com.br/sitemap.xml` → enviar.
5. Em ~24h o Google começa a indexar.

## Pra atualizar o site depois

1. Edita os arquivos em `/Users/joaocarpes/SoloApp/site/` localmente.
2. Testa abrindo `index.html` no Finder.
3. No File Manager da Hostinger, sobrescreve só os arquivos que mudaram.
4. Aba anônima pra confirmar (cache do navegador atrapalha).

## Problemas comuns

- **Imagens não aparecem**: verifica se a pasta `img/` foi enviada e se os nomes batem (case-sensitive em alguns servidores).
- **CSS não carrega**: igual — confere se a pasta `css/` está em `public_html/css/style.css`.
- **Formulário de contato não envia**: o `mailto:` depende do cliente de email do visitante. Pra ter formulário com envio direto via servidor, precisa configurar PHP (`mail()` da Hostinger) ou usar um serviço como Formspree.io.

## Próximos passos sugeridos (depois do site no ar)

- Trocar os depoimentos placeholder por reais (assim que tiver feedback de produtor).
- Trocar fotos da galeria de Análise de Solo por fotos reais do laboratório.
- Adicionar Google Analytics 4 ou Plausible (analytics).
- Quando o APK do app sair, atualizar a página `app.html` com o link de download direto.
- Configurar email profissional `contato@oscarpes.com.br` na Hostinger (plano com email incluso).
