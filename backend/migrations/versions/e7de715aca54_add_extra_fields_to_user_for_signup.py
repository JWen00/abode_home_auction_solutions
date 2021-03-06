"""add extra fields to user for signup

Revision ID: e7de715aca54
Revises: 1db5c6d1805a
Create Date: 2020-11-01 19:35:28.273094

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = 'e7de715aca54'
down_revision = '1db5c6d1805a'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('user', sa.Column('country', sa.String(), nullable=True))
    op.add_column('user', sa.Column('phone_number', sa.String(), nullable=True))
    op.add_column('user', sa.Column('postcode', sa.String(), nullable=True))
    op.add_column('user', sa.Column('state', sa.String(), nullable=True))
    op.add_column('user', sa.Column('street', sa.String(), nullable=True))
    op.add_column('user', sa.Column('suburb', sa.String(), nullable=True))
    connection = op.get_bind()
    connection.execute("UPDATE \"user\" SET country='Australia', postcode='2033', state='NSW', street='100 Anzac Parade', suburb='Kensington', phone_number='0412426859'")
    op.alter_column('user', 'country', nullable=False)
    op.alter_column('user', 'phone_number', nullable=False)
    op.alter_column('user', 'postcode', nullable=False)
    op.alter_column('user', 'state', nullable=False)
    op.alter_column('user', 'street', nullable=False)
    op.alter_column('user', 'suburb', nullable=False)
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('user', 'suburb')
    op.drop_column('user', 'street')
    op.drop_column('user', 'state')
    op.drop_column('user', 'postcode')
    op.drop_column('user', 'phone_number')
    op.drop_column('user', 'country')
    # ### end Alembic commands ###
