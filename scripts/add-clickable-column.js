const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function addClickableColumn() {
  console.log('Adding is_clickable column to week_deals table...');

  // Update all existing records to have is_clickable = true
  const { data, error } = await supabase
    .from('week_deals')
    .update({ is_clickable: true })
    .is('is_clickable', null)
    .select();

  if (error) {
    // Column might not exist yet, try to add it via direct update
    console.log('Trying to update existing records...');

    const { data: allDeals, error: fetchError } = await supabase
      .from('week_deals')
      .select('*');

    if (fetchError) {
      console.error('Error fetching deals:', fetchError.message);
      return;
    }

    console.log('Found', allDeals.length, 'deals');

    // Update each deal to add is_clickable
    for (const deal of allDeals) {
      const { error: updateError } = await supabase
        .from('week_deals')
        .update({ is_clickable: true })
        .eq('id', deal.id);

      if (updateError) {
        console.log('Could not update deal', deal.id, '- column may need to be added manually');
      } else {
        console.log('Updated deal:', deal.title);
      }
    }
  } else {
    console.log('Updated', data?.length || 0, 'deals');
  }

  console.log('Done!');
  console.log('\nIf the is_clickable column does not exist, run this SQL in Supabase:');
  console.log('ALTER TABLE week_deals ADD COLUMN is_clickable BOOLEAN DEFAULT true;');
}

addClickableColumn();
