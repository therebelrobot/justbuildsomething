var request = window.superagent

$(document).ready(mainApp)
function mainApp () {
  var ideas = m.prop([])
  var thisIdea = m.prop({
    title: 'Just Build Something',
    description: ['Sometimes you just need an idea. ',
      m('em', 'Any'),
      ' idea.',
      m('br'),
      "We've got you covered."
    ],
    additional_details: null
  })
  var anotherIdea = m.prop(false)
  var JBS = {
    // controller
    controller: function () {
      request.get('/ideas.json').end(function (err, data) {
        if (err) {
          throw new Error(err)
        }
        ideas(data.body)
        console.log(ideas())
        m.redraw(true)
      })
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
            m('.collapse.navbar-collapse.navbar-right.col-md-6', [
              m('ul.nav.navbar-nav.col-md-3', [
                m('li.col-md-12', [
                  m('select.form-control', {
                    config: function (el, isinit, context) {
                      if (isinit) return
                      console.log(el)
                      $(el).select2({
                        tags: true,
                        tokenSeparators: [','],
                        placeholder: 'Search by tag',
                        allowClear:true
                      })
                    },
                    multiple:"multiple"
                  }, _.map(ideas(), function (idea) {
                    return m('option', idea.title)
                  }))
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
                  m('h1.brand-heading', thisIdea().title),
                  m('p.intro-text', thisIdea().description),
                  m("a.btn.btn-circle.page-scroll[href='#']", {
                    config: function (el, isInit, context) {
                      if (isInit) return
                      console.log('initing')
                      el.onclick = function (event) {
                        console.log('clicking')
                        getIdea()
                      }
                    }
                  }, [
                    'Give me something ',
                    m('span', {
                      className: anotherIdea()? '': 'hidden'
                    }, 'else '),
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
  var getIdea = function (tag) {
    var tag = tag
    anotherIdea(true)
    if (!tag) {
      var randomIndex = getRandom(0, ideas().length - 1)
      thisIdea(ideas()[randomIndex])
      m.redraw(true)
    }
  }
}

function getRandom (min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}
