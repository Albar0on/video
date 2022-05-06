


  const iframe = document.getElementById('api-frame')
  const scrollElement = document.querySelector('.scroller')
  const caption = document.querySelector('.caption')
  const uid = 'da3f6e7b85ed44b7aa8bb5571e365abc'

  // Create a Sketchfab Viewer instance
  const client = new Sketchfab(iframe)
  // Register the GSAP Scroll plugin
  // gsap.registerPlugin(ScrollTrigger)

  // This function is called once the viewer has been initialized
  function initAnimation(api) {
    // Get the list of annotation points
    api.getAnnotationList((err, annotations) => {
      // Setup the first point
      const values = {
        ex: annotations[0].eye[0],
        ey: annotations[0].eye[1],
        ez: annotations[0].eye[2],
        tx: annotations[0].target[0],
        ty: annotations[0].target[1],
        tz: annotations[0].target[2],
        index: 0,
      }
      api.setCameraLookAt(annotations[0].eye, annotations[0].target, 0)
      // caption.querySelector('h2').innerText = annotations[0].name
      // caption.querySelector('p').innerText = annotations[0].content.raw

      // Create a timeline instance. See GSAP documentation for more
      const timeline = gsap.timeline({})

      // Add each annotation point's data to the timeline
      annotations.forEach((annotation, i) => {
        if (i !== 0) {
          api.hideAnnotation(i)
          const e = annotation.eye
          const t = annotation.target
          timeline.to(values, {
            ex: e[0],
            ey: e[1],
            ez: e[2],
            tx: t[0],
            ty: t[1],
            tz: t[2],
            index: i,
            duration: 1,
          })
        }
      })

      let displayed = true

      // Setup the ScrollTrigger with the animation timeline
      ScrollTrigger.create({
        trigger: scrollElement,
        start: "top bottom",
        end: "bottom bottom",
        scrub: true,
        animation: timeline,
        toggleActions: "play none reverse none",
        // Set the camera look-at position on every update and set the caption text
        onUpdate: self => {
          const currentIndex = self.direction === 1 ? Math.floor(values.index) : Math.ceil(values.index)
          caption.querySelector('h2').innerText = annotations[currentIndex].name
          caption.querySelector('p').innerText = annotations[currentIndex].content.raw
          api.setCameraLookAt([values.ex, values.ey, values.ez], [values.tx, values.ty, values.tz], 0)
        },
      })

    })
  }

  // Initialize the viewer
  client.init(uid, {
    success: function onSuccess(api) {
      api.start();
      api.addEventListener('viewerready', function () {
        initAnimation(api)
      });
    },
    error: function onError() {
      console.log('Viewer error');
    },
    animation_autoplay: 0,
    camera: 0,
    autostart: 1,
    ui_controls: 0,
    ui_inspector: 0,
    scrollwheel: 0,
    ui_stop: 0,
    double_click: 0,
    ui_hint: 0,
    annotations_visible: 0,
  });