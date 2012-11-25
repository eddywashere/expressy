(($) ->
  ewh =
    init: ->
      console.log('init function')
      ewh.events()
    events: ->
      $('.ajax-link').click (e) ->
        e.preventDefault()
      console.log 'events'

  $(document).ready ewh.init
) jQuery