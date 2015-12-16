$(document).ready(mainApp)
function mainApp () {
  var JBS = {
    // controller
    controller: function () {
      return {}
    },
    view: function (ctrl) {
      return m('.wrapper', [
        m("nav.navbar.navbar-custom.navbar-fixed-top[role='navigation']", [
          m('.container', [
            m('.navbar-header', [
              m("button.navbar-toggle[data-target='.navbar-main-collapse'][data-toggle='collapse'][type='button']", [
                m('i.fa.fa-bars')
              ]),
              m("a.navbar-brand.page-scroll[href='#page-top']", [
                m('i.fa.fa-play-circle'),
                ' ',
                m('span.light', 'Just Build'),
                ' Something        '
              ])
            ]),
            m('.collapse.navbar-collapse.navbar-right.navbar-main-collapse', [
              m('ul.nav.navbar-nav', [
                m('li', [
                  m("input.form-control[placeholder='Tag Search'][type='text']")
                ])
              ])
            ])
          ])
        ]),
        m('header.intro', [
          m('.intro-body', [
            m('.container', [
              m('.row', [
                m('.col-md-8.col-md-offset-2', [
                  m('h1.brand-heading', 'Just Build Something'),
                  m('p.intro-text', ['Sometimes you just need an idea. ',
                    m('em', 'Any'),
                    ' idea.',
                    m('br'),
                    'We\'ve got you covered.'
                  ]),
                  m("a.btn.btn-circle.page-scroll[href='#']", [
                    'Give me something ',
                    m('i.fa.fa-angle-double-up.animated')
                  ])
                ])
              ])
            ])
          ])
        ])
      ])
    }
  }
  // initialize
  m.mount(document.getElementById('justbuildsomething'), JBS)
}
