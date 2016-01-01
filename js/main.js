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
    additional_details: null,
    tags:[]
  })
  var ideaTags = m.prop([])
  var anotherIdea = m.prop(false)
  var noOtherIdeas = m.prop(false)
  var JBS = {
    // controller
    controller: function () {
      request.get('/ideas.json').end(function (err, data) {
        if (err) {
          throw new Error(err)
        }
        ideas(data.body)
        m.redraw(true)
      })
      return {}
    },
    view: function (ctrl) {
      var tags = _.pluck(ideas(), 'tags')
      tags = _.flatten(tags)
      tags = _.uniq(tags)
      var getTagOptions = {}
      var getTagContents = []
      if(noOtherIdeas()){
        getTagOptions.disabled = true
        getTagContents = ['No others found. Clear Tags',  m('i.fa.fa-close.animated')]
          getTagOptions.config= function (el, isInit, context) {
            if (isInit) return
            el.onclick = function (event) {
              ideaTags([])
              getIdea()
              $('.tags-select').trigger("change")
            }
          }
      } else{
        getTagContents = [
          'Give me something ',
          m('span', {
            className: anotherIdea()? '': 'hidden'
          }, 'else '),
          m('i.fa.fa-angle-double-up.animated')
        ]
        getTagOptions.config= function (el, isInit, context) {
          if (isInit) return
          el.onclick = function (event) {
            getIdea()
          }
        }
      }
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
                  m('select.form-control.tags-select', {
                    config: function (el, isinit, context) {
                      if (isinit) return
                      $(el).select2({
                        tags: true,
                        tokenSeparators: [','],
                        placeholder: 'Search by tag',
                        allowClear: true
                      })
                      el.onchange = function (event) {
                        var value = $(el).val() || []
                        ideaTags(value)
                        getIdea()
                      }
                    },
                    multiple: 'multiple'
                  }, _.map(tags, function (tag) {
                    var options = {}
                    if(ideaTags().indexOf(tag)>-1){
                      options.selected = true
                    }
                    return m('option', options, tag)
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
                  m('p.tags', _.map(thisIdea().tags, function(tag){
                    return m('span.badge', {
                      config:function(el, isInit, context){
                        el.onclick = function(event){
                          var localideaTags = ideaTags()
                          localideaTags.push(tag)
                          localideaTags = _.uniq(localideaTags)
                          ideaTags(localideaTags)
                          getIdea()
                          $('.tags-select').trigger("change")
                        }
                      }
                    }, tag)
                  })),
                  m("a.btn.btn-circle.page-scroll[href='#']", getTagOptions, getTagContents)
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
  var getIdea = function () {
    var tags = ideaTags()
    anotherIdea(true)
    var localIdeas = ideas()
    if (tags.length) {
      var localIdeas = _.filter(ideas(), function (idea) {
        var intersection = _.intersection(idea.tags, tags)
        return !!intersection.length
      })
    }
    localIdeas = _.reject(localIdeas,thisIdea())
    noOtherIdeas(localIdeas.length === 1)
    var randomIndex = getRandom(0, localIdeas.length - 1)
    thisIdea(localIdeas[randomIndex])
    console.log('redrawing')
    m.redraw(true)
  }
}

function getRandom (min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}
