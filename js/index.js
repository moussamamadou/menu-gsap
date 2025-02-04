document.addEventListener("DOMContentLoaded", function() {
    // Select various elements in the navigation menu and hero section
    const navBottom = document.querySelector('[data-nav="bottom-wrapper"]');
    const linksImgWrapper = document.querySelectorAll('[data-nav="link-img"]');
    const linksImg = document.querySelectorAll('[data-nav="link-img"] img');
    const navTopLinks = document.querySelectorAll('[data-nav="top-link"]');
    const navBottomLinks = document.querySelectorAll('[data-nav="bottom-link"]');
    const allNavLines = document.querySelectorAll('[data-nav="bottom-line"]');
    const navMenuButton = document.querySelector('[data-nav="menu-button"]');
    const navMenuLines = document.querySelectorAll('[data-nav="menu-line"]');
    const heroTexts = document.querySelectorAll('[data-hero="text"]');

    // Create split animation for each character in top and bottom navigation links
    const navBottomLinksSplits = Array.from(navBottomLinks, (n) =>
      new SplitType(n, { type: "chars" })
    );

    const navTopLinksSplits = Array.from(navTopLinks, (n) =>
      new SplitType(n, { type: "chars" })
    );

    // Set up initial styles for navBottom and link image wrappers
    gsap.set(navBottom, { display: "flex" });
    gsap.set(linksImgWrapper, {
      clipPath: (index) => (index % 2 === 1 ? "inset(0% 100% 0% 0%)" : "inset(0% 0% 0% 100%)")
    });

    // Function to create hover animation for top navigation links
    const createTopLinkHoverAnimation = (index) => {
      const chars = navTopLinksSplits[index].chars;
      const staggerFrom = index % 2 === 0 ? "start" : "end";
      // Define animation for mouse enter
      const onEnter = () => {
        const tl = gsap.timeline();
        tl.to(chars, {
          y: "-100%",
          stagger: { each: 0.02, from: staggerFrom }
        });
      };

      // Define animation for mouse leave
      const onLeave = () => {
        const tl = gsap.timeline();
        tl.to(chars, {
          y: 0,
          overwrite: true,
          stagger: { each: 0.02, from: staggerFrom }
        });
      };
      
      // Attach animations to mouse events
      navTopLinks[index].addEventListener("mouseenter", onEnter);
      navTopLinks[index].addEventListener("mouseleave", onLeave);
    };

    // Apply hover animations to each top link
    navTopLinks.forEach((_, index) => createTopLinkHoverAnimation(index));

    // Function to create hover animation for bottom navigation links
    const createBottomLinkHoverAnimation = (index) => {
      const chars = navBottomLinksSplits[index].chars;
      const staggerFrom = index % 2 === 0 ? "start" : "end";
      // Define animation for mouse enter
      const onEnter = () => {
        const tl = gsap.timeline();
        tl.to(chars, {
            y: "-100%",
            stagger: { each: 0.02, from: staggerFrom }
          })
          .to([linksImgWrapper[2 * index], linksImgWrapper[2 * index + 1]], {
            clipPath: "inset(0% 0% 0% 0%)"
          }, 0.2)
          .fromTo([linksImg[2 * index], linksImg[2 * index + 1]], { scale: 1.5 }, {
            scale: 1,
            duration: 0.75,
            ease: "expo.out"
          }, 0.2);
      };

      // Define animation for mouse leave
      const onLeave = () => {
        const tl = gsap.timeline();
        tl.to(chars, {
            y: 0,
            overwrite: true,
            stagger: { each: 0.02, from: staggerFrom }
          })
          .to([linksImgWrapper[2 * index], linksImgWrapper[2 * index + 1]], {
            clipPath: (i) => (i % 2 === 1 ? "inset(0% 100% 0% 0%)" : "inset(0% 0% 0% 100%)")
          }, 0.2)
          .fromTo([linksImg[2 * index], linksImg[2 * index + 1]], { scale: 1 }, {
            scale: 1.5,
            duration: 0.75,
            ease: "power2.out"
          }, 0.2);
      };
      // Attach animations to mouse events
      navBottomLinks[index].addEventListener("mouseenter", onEnter);
      navBottomLinks[index].addEventListener("mouseleave", onLeave);
    };

    // Apply hover animations to each bottom link
    navBottomLinks.forEach((_, index) => createBottomLinkHoverAnimation(index));

    // Define the open animation timeline for the menu
    const openAnimation = gsap.timeline({ paused: true })
      .fromTo(navBottom, { clipPath: "inset(0 0 100% 0)" },
      {
        clipPath: "inset(0 0 0% 0)",
        duration: 1.25,
        ease: "expo.inOut"
      })
      .from(allNavLines, {
        clipPath: (index) => (index % 2 === 1 ? "inset(1px 100% 1.15px 0%)" :
          "inset(1px 0% 1.15px 100%)"),
        duration: 1.25,
        ease: "power3.inOut"
      }, 0.25)
      .fromTo(navBottomLinksSplits.map(x => x.lines[0]), { y: "100%" }, {
        y: 0,
        duration: 1.5,
        ease: "power3.inOut"
      }, 0)
      .to(navTopLinks, {
        color: '#1e1d1a'
      }, 0.5)
      .to(navMenuLines, {
        backgroundColor: "#1e1d1a",
        duration: 0.125,
        ease: "power2.out"
      }, 0.5)
      .to(navMenuLines, {
        transform: (i) => `translate(0, ${i % 2 === 0 ? "4px" : "-5px"})`,
        duration: 0.5,
        ease: "power2.out"
      }, 0.5)
      .to(heroTexts, {
        opacity: 0,
        duration: 1,
        ease: "power2.inOut"
      }, 0);

    // Define the close animation timeline for the menu
    const closeAnimation = gsap.timeline({ paused: true })
      .to(navBottom, { clipPath: "inset(0 0 100% 0)", duration: 1.5, ease: "expo.inOut" })
      .to(allNavLines, {
        clipPath: (index) => (index % 2 === 1 ? "inset(1px 100% 1.15px 0%)" :
          "inset(1px 0% 1.15px 100%)"),
        duration: 1,
        ease: "power3.inOut"
      }, 0)
      .fromTo(navBottomLinksSplits.map(x => x.lines[0]), { y: 0 }, {
        y: "100%",
        duration: 1,
        ease: "power3.inOut"
      }, 0)
      .to(navTopLinks, {
        color: "white"
      }, "-=0.5")
      .to(navMenuLines, {
        backgroundColor: "white",
        duration: 0.125,
        ease: "power2.out"
      }, "-=0.5")
      .to(navMenuLines, {
        transform: "translate(0)",
        duration: 0.75,
        ease: "power2.out"
      }, "-=0.5")
      .to(heroTexts, {
        opacity: 1,
        duration: 1,
        ease: "power2.out"
      }, .5);

    // Track whether the menu is open or closed
    let isClosed = false;

    // Toggle the menu animation on menu click
    navMenuButton.addEventListener("click", () => {
      if (isClosed) {
        navBottomLinksSplits.forEach((n) => n.elements[0]?.classList.remove("fade-in"));
        closeAnimation.restart();
      } else {
        openAnimation.restart().call(() => {
          navBottomLinksSplits.forEach((n) => n.elements[0]?.classList.add("fade-in"));
        });
      }
      isClosed = !isClosed;
    });
})