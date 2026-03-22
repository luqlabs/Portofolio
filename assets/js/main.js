/*=============== HOME SPLIT TEXT ===============*/
const { animate, splitText, stagger } = anime

const { chars: chars1 } = splitText('.home__profession-1', { chars: true });
const { chars: chars2 } = splitText('.home__profession-2', { chars: true });

animate(chars1, {
  y: [
    { to: ['100%', '0%'] },
    { to: '-100%', delay: 4000, ease: 'in(3)' }
  ],
  duration: 900,
  ease: 'out(3)',
  delay: stagger(80),
  loop: true,
});

animate(chars2, {
  y: [
    { to: ['100%', '0%'] },
    { to: '-100%', delay: 4000, ease: 'in(3)' }
  ],
  duration: 900,
  ease: 'out(3)',
  delay: stagger(80),
  loop: true,
});
/*=============== SWIPER PROJECTS ===============*/
const swiperProjects = new Swiper('.projects__swiper', {
  loop: true,
  spaceBetween: 24,
  slidesPerView: 'auto',
  grabCursor: true,
  speed: 600,

  autoplay: {
  delay: 3000,
  disableOnInteraction: false,
  },

  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
});


/*=============== WORK TABS ===============*/


/*=============== SERVICES ACCORDION ===============*/
const servicesButtons = document.querySelectorAll('.services__button')

servicesButtons.forEach(button => {
  const heightInfo = document.querySelector('.services__info')
  heightInfo.style.height = heightInfo.scrollHeight + 'px'

  button.addEventListener('click', () =>{
    const servicesCards = document.querySelectorAll('.services__card'),
          currentCard = button.parentNode,
          currentInfo = currentCard.querySelector('.services__info'),
          isCardOpen = currentCard.classList.contains('services-open')

    servicesCards.forEach(card => {
      card.classList.replace('services-open', 'services-close')

      const info = card.querySelector('.services__info')
            info.style.height = '0'
    })

    if(!isCardOpen){
      currentCard.classList.replace('services-close', 'services-open')
      currentInfo.style.height = currentInfo.scrollHeight + 'px'
    }
  })
})

/*=============== TESTIMONIALS OF DUPLICATE CARDS ===============*/


/*=============== COPY EMAIL IN CONTACT ===============*/
const copyBtn = document.getElementById('contact-btn'),
      copyEmail = document.getElementById('contact-email').textContent

copyBtn.addEventListener('click', () => {
  navigator.clipboard.writeText(copyEmail).then(() => {
    copyBtn.innerHTML = 'Email copied <i class="ri-check-line"></i>'

    setTimeout(() => {
      copyBtn.innerHTML = 'Copy email <i class="ri-file-copy-line"></i>'
    }, 2000)
  })
})


/*=============== CURRENT YEAR OF THE FOOTER ===============*/ 
const textYear = document.getElementById('footer-year'),
      currentYear = new Date().getFullYear()

textYear.textContent = currentYear

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')

const scrollActive = () => {
  const scrollY = window.scrollY

  sections.forEach(sections => {
    const id = sections.id,
          top = sections.offsetTop - 50,
          height = sections.offsetHeight,
          link = document.querySelector('.nav__menu a[href*=' + id + ']')

    if(!link) return

    link.classList.toggle('active-link', scrollY > top && scrollY <= top + height)
  })
}
window.addEventListener('scroll', scrollActive)

/*=============== CUSTOM CURSOR ===============*/
const cursor = document.querySelector('.cursor')
let mouseX = 0, mouseY = 0

const cursorMove = () => {

  cursor.style.left = `${mouseX}px`
  cursor.style.top = `${mouseY}px`
  cursor.style.transform = 'translate(-50%, -50%)'

  requestAnimationFrame(cursorMove)
}

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX
  mouseY = e.clientY
})

cursorMove()


/* Hide custom cursor on links */
const a = document.querySelectorAll('a')

a.forEach(item => {
  item.addEventListener('mouseover', () => {
    cursor.classList.add('hide-cursor')
  })
  item.addEventListener('mouseleave', () => {
    cursor.classList.remove('hide-cursor')
  })
})

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
  origin: 'top',
  distance: '60px',
  duration: 2000,
  delay: 300,
  //reset: true, //
})

/*=============== PROCESS MODAL FUNCTIONALITY ===============*/

// Database konten proses untuk tiap project

const processContent = {
  
  /* ================= PIZZA SALES ================= */
  'pizza-sales': {
    title: 'Pizza Sales Performance Dashboard',
    tags: ['Excel', 'SQL', 'Power BI'],
    steps: [
      {
        title: '🧹 Data Cleaning & Preparation',
        type: 'list',
        content: [
          'Standardized <code>order_date</code> format from various input variations',
          'Data consistency validation: ensured <code>order_id</code> is unique, no nulls in <code>price</code> and <code>quantity</code>',
          'Outlier handling: filtered orders with <code>total_price = 0</code> (test/cancelled data)',
          'Mapped pizza names with case-sensitive variations for aggregation consistency',
          'Tools: Excel Power Query for preprocessing before loading to SQL Server'
        ]
      },
      {
        title: '💻 SQL Query Highlights',
        type: 'code',
        language: 'sql',
        content: `-- KPI: Revenue Contribution by Category
SELECT 
  pizza_category AS Category,
  CAST(SUM(total_price) AS DECIMAL(10,2)) AS CategoryRevenue,
  CAST(100.0 * SUM(total_price) / 
       NULLIF(SUM(SUM(total_price)) OVER (), 0) AS DECIMAL(10,2)
  ) AS RevenuePercent
FROM dbo.pizza_sales
GROUP BY pizza_category
ORDER BY RevenuePercent DESC;

-- Top 5 Pizzas by Revenue
SELECT TOP (5) 
  pizza_name AS PizzaName,
  CAST(SUM(total_price) AS DECIMAL(10,2)) AS TotalRevenue
FROM dbo.pizza_sales
GROUP BY pizza_name
ORDER BY TotalRevenue DESC;`
      },
      {
        title: '📐 DAX Measures (Power BI)',
        type: 'code',
        language: 'dax',
        content: `-- 🎯 Core Revenue & Volume KPIs
Total Revenue = SUM(pizza_sales[total_price])
Total Pizzas Sold = SUM(pizza_sales[quantity])
Total Orders = DISTINCTCOUNT(pizza_sales[order_id])

-- 📊 Customer Behavior Metrics
Avg Order Value = DIVIDE([Total Revenue], [Total Orders])
Avg Pizzas Per Order = DIVIDE([Total Pizzas Sold], [Total Orders])`
      },
      {
        title: '🔄 Data Transformation',
        type: 'list',
        content: [
          'Time Intelligence: grouped <code>order_date</code> into Day/Month/Quarter for trend analysis',
          'Calculated Columns: <code>Order Hour = HOUR(order_time)</code> for peak hour analysis',
          'Bucketing: pizza price categories (Budget < $10, Standard $10-$15, Premium > $15)',
          'Star Schema: Fact_Sales related to Dim_Pizza, Dim_Date, Dim_Customer'
        ]
      },
      {
        title: '📊 Key Business Insights',
        type: 'list',
        content: [
          '"Classic" category contributes ~45% of total revenue → focus promotions here',
          'Large size has the highest average order value → upsizing strategy',
          'Peak order time: Friday & Saturday nights (18:00-21:00) → optimize staffing',
          'Top 5 pizzas generate 30% of revenue → bundle promotion opportunity'
        ]
      }
    ],
    githubLink: 'https://github.com/luqlabs/Pizza-Sales-Project'
  },

  /* ================= SAMSUNG SUPPLY CHAIN ================= */
  'samsung': {
    title: 'Samsung Supply Chain & Logistics Analytics',
    tags: ['Power BI', 'DAX', 'Data Modeling'],
    steps: [
      {
        title: '🧹 Data Cleaning & Integration',
        type: 'list',
        content: [
          'Standardized supplier names and product codes from multiple source systems',
          'Handled missing values in <code>lead_time</code> and <code>delivery_date</code> columns',
          'Consistency validation: ensured <code>shipment_id</code> is unique, quantity not negative',
          'Date dimension setup: created calendar table with fiscal year and holiday flags',
          'Tools: Power Query Editor for ETL pipeline'
        ]
      },
      {
        title: '🔄 Data Modeling',
        type: 'list',
        content: [
          'Star Schema Design: Fact_Shipment related to Dim_Supplier, Dim_Product, Dim_Date, Dim_Customer',
          'Calculated Columns: <code>LeadTime = DeliveryDate - OrderDate</code>',
          'Inventory Turnover logic: <code>COGS / Average Inventory Value</code>',
          'Safety Stock Flag: conditional column for stockout risk identification'
        ]
      },
      {
        title: '📐 DAX Measures (Power BI)',
        type: 'code',
        language: 'dax',
        content: `-- 📦 Base Measure
Total Shipment = COUNTROWS(fact_shipment)

-- ✅ Delivery Performance KPIs
Total Delivered Ship = 
  CALCULATE([Total Shipment], fact_shipment[status] = "Delivered")

Total Delay = 
  CALCULATE([Total Shipment], fact_shipment[status] = "Delayed")

-- 🎯 End-to-End Quality: Perfect Order %
Perfect Order % = 
  VAR perfectOrder = 
    CALCULATE(
      [Total Shipment],
      fact_shipment[status] = "Delivered",
      fact_production[defect_rate_pct] < 1
    )
  RETURN
    DIVIDE(perfectOrder, [Total Shipment])

-- 💸 Promotion Effectiveness: Discount %
Discount % = 
  VAR product_amt = [Discount] + [Total Revenue]
  RETURN
    DIVIDE([Discount], product_amt)`
      },
      {
        title: '📊 Key Supply Chain Insights',
        type: 'list',
        content: [
          'Identified 3 suppliers with highest lead times → contract negotiation opportunity',
          'Products with inventory turnover < 2x/year → review demand forecasting',
          'Carriers with on-time delivery rate < 85% → evaluate partnership',
          'Perfect Order % < 70% in electronics category → focus improvement on quality control'
        ]
      }
    ],
    githubLink: 'https://github.com/luqlabs/Supply-Chain-Dashboard'
  },

  /* ================= STOCK MARKET ================= */
  'stock-market': {
    title: 'Stock Market Analysis Dashboard',
    tags: ['Python', 'SQL', 'Pandas'],
    steps: [
      {
        title: '🧹 Data Cleaning (Python/Pandas)',
        type: 'list',
        content: [
          'Merged 6 CSV files (Apple, Google, Facebook, Nvidia, Tesla, Twitter) into unified dataset',
          'Standardized data types: <code>date → datetime</code>, <code>price → float</code>, <code>volume → int64</code>',
          'Handled missing values: forward-fill for prices, zero-fill for volume if needed',
          'Consistency validation: ensured no negative prices or anomalous volumes',
          'Feature engineering: added <code>company</code> column as identifier'
        ]
      },
      {
        title: '🐍 Python Feature Engineering',
        type: 'code',
        language: 'python',
        content: `# 📈 Technical Indicators: Moving Average (MA50 & MA200)
for df in dfs:
    df['MA50'] = df.Close.rolling(50).mean()
    df['MA200'] = df.Close.rolling(200).mean()

# 💹 Price Analysis: Daily % Change
for df in dfs:
    df['Percent change in price'] = df.Close.pct_change()

# 📊 Volume Analysis: Trading Activity Changes
for df in dfs:
    df['Previous day volume'] = df.Volume.shift(1)
    df['Percent change in volume'] = df.Volume.pct_change()`
      },
      {
        title: '💻 SQL Query Highlights',
        type: 'code',
        language: 'sql',
        content: `-- Unified View: Combining 6 stock tables
CREATE OR ALTER VIEW dbo.vw_Stock_Combined AS
SELECT 
  CAST([Date] AS date) AS trade_date,
  CAST([Open] AS float) AS open_price,
  CAST([Close] AS float) AS close_price,
  CAST([Volume] AS bigint) AS volume,
  N'Apple' AS company
FROM dbo.Apple
UNION ALL SELECT ..., N'Facebook' FROM dbo.Facebook

-- Moving Average Analysis (MA50 & MA200)
SELECT
  trade_date,
  company,
  open_price,
  ROUND(AVG(open_price) OVER (
    PARTITION BY company 
    ORDER BY trade_date 
    ROWS BETWEEN 49 PRECEDING AND CURRENT ROW
  ), 4) AS ma50_open
FROM dbo.vw_Stock_Combined;`
      },
      {
        title: '📊 Data Analysis & Visualization',
        type: 'list',
        content: [
          'Volatility Analysis: standard deviation of daily returns for risk assessment',
          'Trend Identification: crossover signal between MA50 and MA200 (Golden/Death Cross)',
          'Volume-Price Correlation: confirming trend with trading activity',
          'Export to structured CSV for dashboard/visualization consumption'
        ]
      },
      {
        title: '📈 Key Market Insights',
        type: 'list',
        content: [
          'Tech stocks showed highest volatility in Q1 2022',
          'MA50/MA200 crossover provided accurate trend reversal signals',
          'Trading volume increased significantly on earnings announcement days',
          'Strong positive correlation between Big Tech stocks (Apple, Google, Facebook)'
        ]
      }
    ],
    githubLink: 'https://github.com/luqlabs/Stock-Market-Project'
  },

  /* ================= PRIME VIDEO ================= */
  'prime-video': {
    title: 'Prime Video Content Analytics',
    tags: ['Excel', 'SQL', 'Power BI'],
    steps: [
      {
        title: '🧹 Data Cleaning & Preparation',
        type: 'list',
        content: [
          'Handled missing values in <code>date_added</code> and <code>duration</code> columns',
          'Standardized rating format (TV-MA, PG-13, R) for consistent filtering',
          'Parsed <code>duration</code> column: separated numbers and units (min/season)',
          'Deduplicated data based on <code>show_id</code> to avoid double counting',
          'Tools: Excel Power Query for preprocessing before loading to Power BI'
        ]
      },
      {
        title: '💻 SQL Query Highlights',
        type: 'code',
        language: 'sql',
        content: `-- CTE for genre analysis per year
WITH genre_yearly AS (
  SELECT 
    listed_in as genre,
    EXTRACT(YEAR FROM date_added::date) as year,
    COUNT(*) as total_content
  FROM prime_content
  WHERE date_added IS NOT NULL
  GROUP BY 1, 2
)
-- Ranking most popular genres per year
SELECT *,
  RANK() OVER (PARTITION BY year ORDER BY total_content DESC) as genre_rank
FROM genre_yearly
ORDER BY year DESC, genre_rank;

-- Content Type Distribution
SELECT 
  type,
  COUNT(*) as total_count,
  ROUND(100.0 * COUNT(*) / SUM(COUNT(*)) OVER(), 2) as percentage
FROM prime_content
GROUP BY type
ORDER BY total_count DESC;`
      },
      {
        title: '🔄 Data Transformation (Power BI)',
        type: 'list',
        content: [
          'Calculated Column: <code>Content Age = YEAR(TODAY()) - release_year</code>',
          'Dynamic parameters for interactive filters: Country, Year, Rating',
          'Pivot table: Content addition trend per quarter',
          'Duration bucketing: Short (<30min), Medium (30-90min), Long (>90min)',
          'Hierarchy: Country → Genre → Content Type for drill-down analysis'
        ]
      },
      {
        title: '📊 Key Content Insights',
        type: 'list',
        content: [
          '"International Movies" genre dominates 35% of total content',
          'Content with TV-MA rating has highest average IMDb score (7.2)',
          'Content addition trend increased 40% YoY in Q4 2020-2021',
          'Optimal duration for engagement: 45-60 minutes (based on rating correlation)'
        ]
      }
    ],
    githubLink: 'https://github.com/luqlabs/Project-Prime-Video-Power-BI-Only-'
  }

};

// Fungsi buka modal
function openProcessModal(projectId) {
  const modal = document.getElementById('processModal');
  const modalBody = document.getElementById('modalBody');
  const data = processContent[projectId];
  
  if (!data) {
    modalBody.innerHTML = `
      <div style="text-align: center; padding: 2rem;">
        <i class="ri-information-line" style="font-size: 3rem; color: var(--first-color);"></i>
        <p style="margin-top: 1rem;">Process documentation for this project is coming soon! 🚀</p>
      </div>
    `;
  } else {
    // Generate tags HTML
    const tagsHTML = data.tags.map(tag => 
      `<span class="project-tag">${tag}</span>`
    ).join(' ');
    
    // Generate steps HTML
    const stepsHTML = data.steps.map(step => {
      if (step.type === 'code') {
        return `
          <div class="process-section">
            <h4><i class="ri-code-line"></i> ${step.title}</h4>
            <div class="process-code"><code>${escapeHtml(step.content)}</code></div>
          </div>
        `;
      } else {
        const listItems = step.content.map(item => `<li>${item}</li>`).join('');
        return `
          <div class="process-section">
            <h4><i class="ri-checkbox-circle-line"></i> ${step.title}</h4>
            <ul class="process-list">${listItems}</ul>
          </div>
        `;
      }
    }).join('');
    
    modalBody.innerHTML = `
      <div class="process-header">
        <h3>🔧 Process: ${data.title}</h3>
        <div>${tagsHTML}</div>
      </div>
      ${stepsHTML}
      <div class="process-footer">
        <a href="${data.githubLink}" target="_blank" rel="noopener">
          <i class="ri-github-fill"></i> View Full Code on GitHub
        </a>
      </div>
    `;
  }
  
  modal.style.display = 'block';
  document.body.classList.add('modal-open');
}

// Fungsi tutup modal
function closeProcessModal() {
  const modal = document.getElementById('processModal');
  modal.style.display = 'none';
  document.body.classList.remove('modal-open');
}

// Helper: Escape HTML untuk code block (mencegah XSS)
function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}

// Event: Close modal when clicking outside content
window.addEventListener('click', function(event) {
  const modal = document.getElementById('processModal');
  if (event.target === modal) {
    closeProcessModal();
  }
});

// Event: Close modal with Escape key
document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    closeProcessModal();
  }
});

// Optional: Smooth scroll untuk internal links di modal
document.addEventListener('click', function(e) {
  if (e.target.closest('.modal a[href^="#"]')) {
    e.preventDefault();
    const target = document.querySelector(e.target.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
});

sr.reveal(`.home__image, .projects__container, .contact__container`)
sr.reveal(`.home__data`, {delay: 900, origin: 'bottom'})
sr.reveal(`.home__info`, {delay: 1200, origin: 'bottom'})
sr.reveal(`.home__social, .home__cv`, {delay: 1500})
sr.reveal(`.about__data`, {origin: 'left'})
sr.reveal(`.about__image`, {origin: 'right'})
sr.reveal(`.services__card`, {interval: 100})