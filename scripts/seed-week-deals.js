const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const weekDeals = [
  {
    title: "Spirit Of The Week",
    image: "https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=400",
    link: "/Week-deals",
    is_active: true,
    sort_order: 1,
  },
  {
    title: "Wine Of The Week",
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400",
    link: "/Week-deals",
    is_active: true,
    sort_order: 2,
  },
  {
    title: "Ale Of The Week",
    image: "https://images.unsplash.com/photo-1608270586620-248524c67de9?w=400",
    link: "/Week-deals",
    is_active: true,
    sort_order: 3,
  },
  {
    title: "Vapes & E-Liquids",
    image: "/Images/Vapes & E-Liquids/Vapes & E-liquids.jpg",
    link: "/Week-deals",
    is_active: true,
    sort_order: 4,
  },
  {
    title: "Sweets Of The Week",
    image: "/Images/categories/Sweets.jpeg",
    link: "/offers",
    is_active: true,
    sort_order: 5,
  },
  {
    title: "£11.50",
    image: "https://images.unsplash.com/photo-1584225064785-c62a8b43d148?w=400",
    link: "/offers",
    is_active: true,
    sort_order: 6,
  },
];

async function seedWeekDeals() {
  console.log('Creating week_deals table...');

  // Create the table using raw SQL
  const { error: createError } = await supabase.rpc('exec_sql', {
    sql: `
      CREATE TABLE IF NOT EXISTS week_deals (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        title TEXT NOT NULL,
        image TEXT NOT NULL,
        link TEXT DEFAULT '/Week-deals',
        is_active BOOLEAN DEFAULT true,
        sort_order INTEGER DEFAULT 0,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `
  });

  if (createError) {
    console.log('Table might already exist or RPC not available, trying to insert directly...');
  }

  console.log('Inserting week deals...');

  const { data, error } = await supabase
    .from('week_deals')
    .insert(weekDeals)
    .select();

  if (error) {
    console.error('Error inserting week deals:', error.message);
    return;
  }

  console.log('Successfully inserted', data.length, 'week deals');
  console.log(data);
}

seedWeekDeals();
