 // Progress bar
    window.addEventListener('scroll', () => {
      const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      document.getElementById('progressBar').style.width = scrolled + '%';
    });

    // Intersection observer for fade-in
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('visible'), entry.target.dataset.delay || 0);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    document.querySelectorAll('.project-featured').forEach((el, i) => {
      el.dataset.delay = i * 150;
      observer.observe(el);
    });

    document.querySelectorAll('.project-card').forEach((el, i) => {
      el.dataset.delay = i * 100;
      observer.observe(el);
    });

    // Filter
    const filterBtns = document.querySelectorAll('.filter-btn');
    const featured = document.querySelectorAll('.project-featured');
    const cards = document.querySelectorAll('.project-card');
    const allItems = [...featured, ...cards];

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;

        allItems.forEach(item => {
          const tags = item.dataset.tags || '';
          const show = filter === 'all' || tags.includes(filter);
          item.style.opacity = show ? '1' : '0.2';
          item.style.pointerEvents = show ? 'auto' : 'none';
        });
      });
    });