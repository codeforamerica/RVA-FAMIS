from django.db import models

COVERAGE_ANSWERS = (
        ('yes', 'Yes'),
        ('no', 'No'),
        ('may', 'Sometimes'),
        )

DATA_STATUS = (
        ('matched', 'matched'),
        ('not matched', 'not matched'),
        )

USER_STATUS = (
        ('satisfied', 'satisfied'),
        ('not satisfied', 'not satisfied'),
        )

class Service(models.Model):
    """This table is a list of the services that have clear coverage
    definitions.
    """
    name = models.CharField(max_length=200)
    covered = models.CharField(max_length=3, choices=COVERAGE_ANSWERS,
            default='no')
    search_terms = models.TextField(blank=True, null=True)
    copay_high = models.IntegerField(blank=True, null=True)
    copay_low = models.IntegerField(blank=True, null=True)
    copay_extra = models.CharField(max_length=200, blank=True, null=True)
    def __unicode__(self):
        return self.name

class Caveat(models.Model):
    """This table stores specific caveats and conditions about covered services.
    """
    legalese = models.TextField()
    plain = models.TextField(blank=True, null=True)
    service = models.ForeignKey('Service', related_name='caveats')
    def __unicode__(self):
        return 'Caveat:"%s"' % self.plain[:20]

class Search(models.Model):
    """An event in which someone searched for a particular service.
    """
    datetime = models.DateTimeField(auto_now_add=True)
    text = models.CharField(max_length=200)
    services = models.ManyToManyField('Service', related_name='searches',
            blank=True)
    data_status = models.CharField(max_length=15, choices=DATA_STATUS)
    user_status = models.CharField(max_length=15, choices=USER_STATUS)
    email = models.EmailField(max_length=254, blank=True, null=True)
    def __unicode__(self):
        return self.text


